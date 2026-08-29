const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const ApiError = require('../../utils/ApiError');
const factory = require('../../utils/crudFactory');
const Product = require('../products/product.model');
const Course = require('../course/course.model');
const Cart = require('../cart/cart.model');
const Order = require('../order/orders.model');
const Enrollment = require('../enrollment/enrollment.model');
const { createPaymobIntention } = require('./gateways/paymob.service');
const { createPayPalOrder, capturePayPalPayment } = require("./gateways/paypal.service");
const {
    paymobCardIntegrationId,
    paymobWalletIntegrationId,
    paymobFawryIntegrationId,
    clientUrl,
    baseUrl2,
    paymobPublicKey
} = require("../../config/env");

// دالة مساعدة لتحديث المخزون والطلاب وإنشاء الإيرادات (Enrollments) عند النجاح
const handleOrderSuccess = async (orderId) => {
    const order = await Order.findById(orderId);

    if (!order || order.isPaid) return;

    order.isPaid = true;
    order.status = 'paid';
    order.paidAt = Date.now();
    await order.save();

    const cart = await Cart.findOne({ cartOwner: order.user });
    if (cart) {
        for (const item of cart.products) {
            if (item.itemType === 'Product') {
                await Product.findByIdAndUpdate(item.item, {
                    $inc: { stock: -item.count, totalSales: +item.count },
                });
            } else if (item.itemType === 'Course') {
                await Course.findByIdAndUpdate(item.item, {
                    $inc: { totalStudents: +1 },
                });
                try {
                    await Enrollment.create({
                        user: order.user,
                        course: item.item,
                        order: order._id,
                    });
                } catch (err) {
                    console.log(`Already enrolled in course: ${item.item}`);
                }
            }
        }
        await Cart.findByIdAndDelete(cart._id);
    }
}

// @desc    Create cash order
exports.createCashOrder = catchAsync(async (req, res, next) => {
    const taxPrice = 0;
    const shippingPrice = 0;

    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
        return next(new ApiError(`There is no cart for this user :${req.user._id}`, StatusCodes.NOT_FOUND));
    }

    const cartPrice = cart.totalAfterDiscount ? cart.totalAfterDiscount : cart.totalCartPrice;

    const order = await Order.create({
        user: req.user._id,
        cartItems: cart.products,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice: taxPrice + shippingPrice + cartPrice,
        paymentMethodType: 'cash',
        isPaid: false,
    });

    if (order) {
        // استدعاء دالة النجاح مباشرة لأن الأوردر كاش وتم إتمامه
        await handleOrderSuccess(order._id);
    }

    // إعادة جلب الأوردر بعد التحديث ليكون محدث بكل التفاصيل
    const updatedOrder = await Order.findById(order._id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Order created cash successfully",
        data: updatedOrder,
    });
});

// @desc    Create Paymob Checkout Session (Intention)
// @route   POST /api/orders/checkout-paymob/:cartId
// @access  Private/User
exports.createPaymobCheckoutSession = catchAsync(async (req, res, next) => {
    const { paymentType = 'card' } = req.body || {}; // 'card', 'wallet', 'fawry'
    const taxPrice = 0;
    const shippingPrice = 0;

    // 1) Get cart and populate products
    const cart = await Cart.findById(req.params.cartId).populate({
        path: 'products.item',
        select: 'title description price',
    });

    if (!cart) {
        return next(new ApiError(`There is no cart for this user :${req.user._id}`, StatusCodes.NOT_FOUND));
    }
    const cartPrice = cart.totalAfterDiscount ? cart.totalAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = taxPrice + shippingPrice + cartPrice;

    // 2) تحديد قنوات الدفع المتاحة في بايموب بناءً على اختيار اليوزر
    // (أرقام الـ Integration IDs الخاصة بك من لوحة تحكم Paymob لكل طريقة دفع)
    let paymentMethodsIds = [];
    if (paymentType === 'card') {
        paymentMethodsIds = [parseInt(paymobCardIntegrationId)];
    } else if (paymentType === 'wallet') {
        paymentMethodsIds = [parseInt(paymobWalletIntegrationId)];
    } else if (paymentType === 'fawry') {
        paymentMethodsIds = [parseInt(paymobFawryIntegrationId)];
    } else {
        return next(new ApiError('Invalid payment type selected', StatusCodes.BAD_REQUEST));
    }

    // 3) Create Pending Order in Database first
    const order = await Order.create({
        user: req.user._id,
        cartItems: cart.products,
        shippingAddress: req.body.shippingAddress,
        taxPrice,
        shippingPrice,
        totalOrderPrice,
        paymentMethodType: paymentType,
        isPaid: false,
    });

    // 4) Call Paymob Intention API
    try {
        const intentionResponse = await createPaymobIntention({
            amount: totalOrderPrice,
            currency: 'EGP',
            paymentMethods: paymentMethodsIds,
            items: cart.products,
            cartTotalAfterDiscount: cart.totalAfterDiscount, // تمرير السعر بعد الخصم لتصحيح تطابق أسعار الـ items مع بايموب
            cartTotalBeforeDiscount: cart.totalCartPrice,
            billingData: {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                phone: req.body.shippingAddress?.phone || '01000000000',
                email: req.user.email,
                city: req.body.shippingAddress?.city || 'Cairo',
                street: req.body.shippingAddress?.details || 'NA',
            },
            redirectionUrl: `${clientUrl}/user/allorders?orderId=${order._id}`,
            notificationUrl: `${baseUrl2}/api/orders/webhook/paymob`,
        });

        // بناء رابط التوجيه المباشر لصفحة بايموب الموحدة باستخدام الـ client_secret
        const paymobRedirectUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${paymobPublicKey}&clientSecret=${intentionResponse.client_secret}`;

        // حفظ الـ Intention ID أو الـ Client Secret في الأوردر للربط لاحقاً
        // order.paymentIntentId = intentionResponse.intention_id;
        order.paymentIntentId = intentionResponse.intention_order_id;
        await order.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Paymob intention created successfully',
            client_secret: intentionResponse.client_secret,
            redirect_url: paymobRedirectUrl, // رابط الدفع المباشر لو حابب تحوله عليه
            orderId: order._id,
            data: {
                client_secret: intentionResponse.client_secret,
                redirect_url: paymobRedirectUrl,
                orderId: order._id,
            },
        });
    } catch (error) {
        // لو حصل خطأ امسح الأوردر المؤقت
        await Order.findByIdAndDelete(order._id);
        return next(new ApiError(error.message, StatusCodes.BAD_REQUEST));
    }
});

// @desc    Create PayPal Checkout Session
// @route   POST /api/orders/checkout-paypal/:cartId
// @access  Private/User
exports.createPayPalCheckoutSession = catchAsync(async (req, res, next) => {
    const taxPrice = 0;
    const shippingPrice = 0;

    const cart = await Cart.findById(req.params.cartId).populate('products.item');
    if (!cart) {
        return next(new ApiError(`There is no cart for this user :${req.user._id}`, 404));
    }

    const cartPrice = cart.totalAfterDiscount ? cart.totalAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = taxPrice + shippingPrice + cartPrice;

    // 1) إنشاء الأوردر في الداتا بيز بحالة غير مدفوع (Pending)
    const order = await Order.create({
        user: req.user._id,
        cartItems: cart.products,
        shippingAddress: req.body.shippingAddress,
        taxPrice,
        shippingPrice,
        totalOrderPrice,
        paymentMethodType: 'paypal',
        isPaid: false,
    });

    // 2) تحويل السعر لـ USD (افتراضاً لو السعر بالمصري اقسم على سعر الدولار تقريباً مثلاً 50، أو لو متجر دولي خليه زي ما هو)
    // لو السعر عندك بـ EGP وعايز تحوله لـ USD (مثال تقريبي أو ثابته لو متجرك بالدولار):
    const amountInUSD = totalOrderPrice / 50;

    // 3) إنشاء طلب باي بال
    try {
        const paypalOrder = await createPayPalOrder({
            amount: amountInUSD,
            currency: 'USD',
            orderId: order._id,
        });

        // استخراج رابط الموافقة (Approval URL) لإرساله للفرونت إند
        const approvalLink = paypalOrder.links.find((link) => link.rel === 'approve')?.href;
        if (!approvalLink) {
            throw new Error('PayPal did not return an approval URL');
        }

        order.paymentIntentId = paypalOrder.id; // حفظ الـ PayPal Order ID
        await order.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'PayPal checkout created successfully',
            approvalUrl: approvalLink,
            orderId: order._id,
            data: {
                approvalUrl: approvalLink,
                orderId: order._id,
            },
        });
    } catch (error) {
        await Order.findByIdAndDelete(order._id);
        return next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

// @desc    Verify and Capture PayPal Payment after user approval
// @route   POST /api/orders/paypal/success
// @access  Private/User
exports.verifyPayPalPayment = catchAsync(async (req, res, next) => {
    const { orderId } = req.body; // الفرونت بيبعت الـ token اللي جاي من باي بال مع الـ orderId

    const order = await Order.findById(orderId);
    if (!order) {
        return next(new ApiError('Order not found', StatusCodes.NOT_FOUND));
    }

    if (order.user.toString() !== req.user._id.toString()) {
        return next(new ApiError('You are not allowed to capture this order', StatusCodes.FORBIDDEN));
    }

    if (order.isPaid) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Order is already paid',
        });
    }

    // الـ paymentIntentId هو الـ PayPal Order ID الحقيقي اللي اتسيف وقت الإنشاء
    const paypalOrderId = order.paymentIntentId;
    if (!paypalOrderId) {
        return next(new ApiError('PayPal Payment Intent ID not found for this order', StatusCodes.BAD_REQUEST));
    }

    const captureData = await capturePayPalPayment(paypalOrderId);

    if (captureData.status === 'COMPLETED') {
        await handleOrderSuccess(orderId);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Payment completed successfully via PayPal',
        });
    } else {
        return next(new ApiError('Payment was not completed by PayPal', StatusCodes.BAD_REQUEST));
    }
});

// @desc    Paymob Webhook to handle successful payments
// @route   POST /api/orders/webhook/paymob
// @access  Public (Called by Paymob servers)
exports.paymobWebhook = catchAsync(async (req, res, next) => {
    try {
        const eventData = req.body;

        if (eventData && eventData.type === 'TRANSACTION' && eventData.obj.success === true) {
            // const intentionId = eventData.obj.intention_id;
            const intentionId = eventData.obj.order.id;

            // ابحث عن الأوردر باستخدام الـ intentionId
            const order = await Order.findOne({ paymentIntentId: intentionId });

            if (order && !order.isPaid) {
                // استدعاء دالة النجاح لتحديث المخزون وإضافات الكورسات وتفريغ العربة
                await handleOrderSuccess(order._id);
            }
        }

        res.status(StatusCodes.OK).json({ received: true });
    } catch (error) {
        console.log(error);
    }
});

// بقية الدوال زي getSpecificOrder, getAllOrders, filterOrdersForLoggedUser تظل كما هي
exports.getSpecificOrder = factory.getOne(Order, {
    modelName: "Order",
    translatableFields: [
        "cartItems.item.title",
        "cartItems.item.description",
    ],
});

exports.filterOrdersForLoggedUser = catchAsync(async (req, res, next) => {
    if (req.user.role === 'student') {
        req.filterObject = { user: req.user._id };
    }

    if (req.user.role === 'instructor') {
        const courseIds = await Course.find({ instructor: req.user._id }).distinct('_id');
        req.filterObject = {
            cartItems: {
                $elemMatch: {
                    itemType: 'Course',
                    item: { $in: courseIds },
                },
            },
        };
    }

    next();
});

exports.getAllOrders = factory.getAll(Order, {
    modelName: "Order",
    translatableFields: [
        "cartItems.item.title",
        "cartItems.item.description",
    ],
});

// @desc    Handle Payment Cancellation (لو اليوزر ضغط Cancel ورجع لموقعك أو البعتة وصلت)
// @route   POST /api/v1/orders/paymob/cancel
// @access  Private/User
exports.cancelOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ApiError("Order not found", StatusCodes.NOT_FOUND));
    }

    const orderUserId = order.user?._id || order.user;
    if (orderUserId?.toString() !== req.user._id.toString()) {
        return next(new ApiError("Unauthorized", StatusCodes.FORBIDDEN));
    }

    if (order.status === "cancelled") {
        return next(
            new ApiError("Order already cancelled", StatusCodes.BAD_REQUEST)
        );
    }

    if (order.isPaid) {
        return next(
            new ApiError("Paid orders can't be cancelled. Refund is required.", StatusCodes.BAD_REQUEST)
        );
    }

    order.status = "cancelled";

    await order.save();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Order cancelled successfully",
        data: order,
    });
});
