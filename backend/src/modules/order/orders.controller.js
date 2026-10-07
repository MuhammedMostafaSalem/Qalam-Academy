const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const ApiError = require("../../utils/ApiError");
const factory = require("../../utils/crudFactory");
const Product = require("../products/product.model");
const Course = require("../course/course.model");
const Cart = require("../cart/cart.model");
const Order = require("../order/orders.model");
const Enrollment = require("../enrollment/enrollment.model");
const {
    createPaymobIntention,
} = require("./gateways/paymob.service");
const {
    createPayPalOrder,
    getPayPalOrder,
    capturePayPalPayment,
} = require("./gateways/paypal.service");
const {
    paymobCardIntegrationId,
    paymobWalletIntegrationId,
    paymobFawryIntegrationId,
    clientUrl,
    baseUrl2,
    paymobPublicKey,
} = require("../../config/env");
const generateFileUrl = require("../../utils/generateFileUrl");

// ==========================================================
// Handle Order Success
// ==========================================================

const handleOrderSuccess = async (orderId) => {
    // --------------------------------------------------
    // 1. Atomically change Order: pending -> paid
    // --------------------------------------------------

    const order = await Order.findOneAndUpdate(
        {
            _id: orderId,
            status: "pending",
            isPaid: false,
        },
        {
            $set: {
                status: "paid",
                isPaid: true,
                paidAt: new Date(),
            },
        },
        {
            new: true,
        }
    );

    // --------------------------------------------------
    // 2. Order was already processed
    // --------------------------------------------------

    if (!order) {
        const existingOrder =
            await Order.findById(orderId);

        if (!existingOrder) {
            throw new ApiError(
                "Order not found",
                StatusCodes.NOT_FOUND
            );
        }

        // Already paid = duplicate webhook/request
        if (
            existingOrder.isPaid ||
            existingOrder.status === "paid"
        ) {
            return existingOrder;
        }

        throw new ApiError(
            "Order cannot be completed",
            StatusCodes.BAD_REQUEST
        );
    }

    // --------------------------------------------------
    // 3. Fulfill Order Snapshot
    // --------------------------------------------------

    for (const item of order.cartItems) {
        // ----------------------------------------------
        // Product
        // ----------------------------------------------

        if (item.itemType === "Product") {
            await Product.findByIdAndUpdate(
                item.item,
                {
                    $inc: {
                        stock: -item.count,
                        totalSales: item.count,
                    },
                }
            );
        }

        // ----------------------------------------------
        // Course
        // ----------------------------------------------

        else if (item.itemType === "Course") {
            const existingEnrollment =
                await Enrollment.findOne({
                    user: order.user,
                    course: item.item,
                });

            if (!existingEnrollment) {
                await Enrollment.create({
                    user: order.user,
                    course: item.item,
                    order: order._id,
                });

                await Course.findByIdAndUpdate(
                    item.item,
                    {
                        $inc: {
                            totalStudents: 1,
                        },
                    }
                );
            }
        }
    }

    // --------------------------------------------------
    // 4. Delete Only The Cart Used By This Order
    // --------------------------------------------------

    if (order.cart) {
        await Cart.findByIdAndDelete(order.cart);
    }

    return order;
};

// ==========================================================
// Create Cash Order
// ==========================================================

// @desc Create cash order with payment proof image
exports.createCashOrder = catchAsync(
    async (req, res, next) => {
        const taxPrice = 0;
        const shippingPrice = 0;

        const cart = await Cart.findById(
            req.params.cartId
        );

        if (!cart) {
            return next(
                new ApiError(
                    req.t("order.noCart", {
                        user: req.user._id,
                    }),
                    StatusCodes.NOT_FOUND
                )
            );
        }

        // التحقق من رفع صورة إثبات الدفع
        if (!req.file) {
            return next(
                new ApiError(
                    "Payment proof image is required",
                    StatusCodes.BAD_REQUEST
                )
            );
        }

        const cartPrice =
            cart.totalAfterDiscount != null
                ? cart.totalAfterDiscount
                : cart.totalCartPrice;

        // معالجة shippingAddress لو كانت JSON string
        let parsedShippingAddress =
            req.body.shippingAddress;

        if (
            typeof parsedShippingAddress ===
            "string"
        ) {
            try {
                parsedShippingAddress =
                    JSON.parse(
                        parsedShippingAddress
                    );
            } catch (e) {
                // leave as-is
            }
        }

        const order = await Order.create({
            user: req.user._id,

            cart: cart._id,

            cartItems: cart.products,

            shippingAddress:
                parsedShippingAddress,

            taxPrice,

            shippingPrice,

            totalOrderPrice:
                taxPrice +
                shippingPrice +
                cartPrice,

            paymentMethodType: "cash",

            isPaid: false,

            status: "pending",

            paymentProofImage:
                generateFileUrl(
                    `${req.uploadFolder}/${req.file.filename}`
                ),
        });

        sendResponse(res, {
            success: true,

            statusCode: StatusCodes.OK,

            message:
                req.t("order.createdCash") ||
                "Cash order created successfully and waiting for admin approval",

            data: order,
        });
    }
);

// ==========================================================
// Approve Cash Order
// ==========================================================

// @desc Admin approve cash order
// @route PATCH /api/orders/:id/approve-cash
// @access Private/Admin

exports.approveCashOrder = catchAsync(
    async (req, res, next) => {
        const order =
            await Order.findById(
                req.params.id
            );

        if (!order) {
            return next(
                new ApiError(
                    req.t("order.notFound"),
                    StatusCodes.NOT_FOUND
                )
            );
        }

        if (
            order.paymentMethodType !==
            "cash"
        ) {
            return next(
                new ApiError(
                    "This is not a cash order",
                    StatusCodes.BAD_REQUEST
                )
            );
        }

        if (
            order.isPaid ||
            order.status === "paid"
        ) {
            return next(
                new ApiError(
                    "Order is already approved and paid",
                    StatusCodes.BAD_REQUEST
                )
            );
        }

        await handleOrderSuccess(
            order._id
        );

        const updatedOrder =
            await Order.findById(
                order._id
            );

        sendResponse(res, {
            success: true,

            statusCode: StatusCodes.OK,

            message:
                "Cash order approved successfully",

            data: updatedOrder,
        });
    }
);

// ==========================================================
// Create Paymob Checkout Session
// ==========================================================

// @desc Create Paymob Checkout Session

exports.createPaymobCheckoutSession =
    catchAsync(
        async (req, res, next) => {
            const {
                paymentType = "card",
            } = req.body || {};

            const taxPrice = 0;
            const shippingPrice = 0;

            const cart =
                await Cart.findById(
                    req.params.cartId
                ).populate({
                    path: "products.item",
                    select:
                        "title description price",
                });

            if (!cart) {
                return next(
                    new ApiError(
                        req.t(
                            "order.noCart",
                            {
                                user: req
                                    .user
                                    ._id,
                            }
                        ),
                        StatusCodes.NOT_FOUND
                    )
                );
            }

            // --------------------------------------------------
            // 1. Calculate Order Price
            // --------------------------------------------------

            const cartPrice =
                cart.totalAfterDiscount !=
                null
                    ? Number(
                          cart.totalAfterDiscount
                      )
                    : Number(
                          cart.totalCartPrice
                      );

            const totalOrderPrice =
                taxPrice +
                shippingPrice +
                cartPrice;

            // --------------------------------------------------
            // 2. Determine Paymob Payment Method
            // --------------------------------------------------

            let paymentMethodsIds = [];

            if (paymentType === "card") {
                paymentMethodsIds = [
                    parseInt(
                        paymobCardIntegrationId
                    ),
                ];
            } else if (
                paymentType === "wallet"
            ) {
                paymentMethodsIds = [
                    parseInt(
                        paymobWalletIntegrationId
                    ),
                ];
            } else if (
                paymentType === "fawry"
            ) {
                paymentMethodsIds = [
                    parseInt(
                        paymobFawryIntegrationId
                    ),
                ];
            } else {
                return next(
                    new ApiError(
                        req.t(
                            "order.InvalidPayment"
                        ),
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // --------------------------------------------------
            // 3. Check Existing Pending Order
            // --------------------------------------------------

            let order =
                await Order.findOne({
                    user: req.user._id,

                    cart: cart._id,

                    status: "pending",

                    isPaid: false,
                });

            // --------------------------------------------------
            // 4. Check Expiration
            // --------------------------------------------------

            if (
                order &&
                order.expiresAt &&
                order.expiresAt <= new Date()
            ) {
                order.status = "expired";

                order.expiredAt = new Date();

                await order.save();

                order = null;
            }

            // --------------------------------------------------
            // 5. Create New Order
            // --------------------------------------------------

            if (!order) {
                order =
                    await Order.create({
                        user: req.user._id,

                        cart: cart._id,

                        cartItems:
                            cart.products,

                        shippingAddress:
                            req.body
                                .shippingAddress,

                        taxPrice,

                        shippingPrice,

                        totalOrderPrice,

                        paymentMethodType:
                            paymentType,

                        isPaid: false,

                        status: "pending",

                        expiresAt:
                            new Date(
                                Date.now() +
                                    30 *
                                        60 *
                                        1000
                            ),
                    });
            }

            // --------------------------------------------------
            // 6. Reuse Existing Pending Order
            // --------------------------------------------------

            else {
                order.paymentMethodType =
                    paymentType;

                order.shippingAddress =
                    req.body
                        .shippingAddress;

                order.totalOrderPrice =
                    totalOrderPrice;

                order.expiresAt =
                    new Date(
                        Date.now() +
                            30 *
                                60 *
                                1000
                    );

                await order.save();
            }

            // --------------------------------------------------
            // 7. Create Paymob Intention
            // --------------------------------------------------

            try {
                const intentionResponse =
                    await createPaymobIntention(
                        {
                            amount:
                                totalOrderPrice,

                            currency: "EGP",

                            paymentMethods:
                                paymentMethodsIds,

                            items:
                                cart.products,

                            cartTotalAfterDiscount:
                                cart.totalAfterDiscount,

                            cartTotalBeforeDiscount:
                                cart.totalCartPrice,

                            billingData: {
                                firstName:
                                    req.user
                                        .firstName,

                                lastName:
                                    req.user
                                        .lastName,

                                phone:
                                    req.body
                                        .shippingAddress
                                        ?.phone ||
                                    "01000000000",

                                email:
                                    req.user
                                        .email,

                                city:
                                    req.body
                                        .shippingAddress
                                        ?.city ||
                                    "Cairo",

                                street:
                                    req.body
                                        .shippingAddress
                                        ?.details ||
                                    "NA",
                            },

                            redirectionUrl:
                                `${clientUrl}/user/allorders?orderId=${order._id}`,

                            notificationUrl:
                                `${baseUrl2}/api/orders/webhook/paymob`,
                        }
                    );

                // --------------------------------------------------
                // 8. Build Paymob Checkout URL
                // --------------------------------------------------

                const paymobRedirectUrl =
                    `https://accept.paymob.com/unifiedcheckout/` +
                    `?publicKey=${paymobPublicKey}` +
                    `&clientSecret=${intentionResponse.client_secret}`;

                // --------------------------------------------------
                // 9. Save Current Paymob Intention ID
                // --------------------------------------------------

                order.paymentIntentId =
                    intentionResponse
                        .intention_order_id;

                await order.save();

                // --------------------------------------------------
                // 10. Return Checkout Information
                // --------------------------------------------------

                return res
                    .status(
                        StatusCodes.OK
                    )
                    .json({
                        success: true,

                        message:
                            req.t(
                                "order.createdPaymob"
                            ),

                        client_secret:
                            intentionResponse
                                .client_secret,

                        redirect_url:
                            paymobRedirectUrl,

                        orderId:
                            order._id,

                        data: {
                            client_secret:
                                intentionResponse
                                    .client_secret,

                            redirect_url:
                                paymobRedirectUrl,

                            orderId:
                                order._id,
                        },
                    });
            } catch (error) {
                console.error(
                    "Paymob Checkout Error:",
                    error.response
                        ?.data ||
                        error.message
                );

                return next(
                    new ApiError(
                        error.message ||
                            "Failed to create Paymob checkout",
                        StatusCodes.BAD_REQUEST
                    )
                );
            }
        }
    );

// ==========================================================
// Create PayPal Checkout Session
// ==========================================================

// @desc Create PayPal Checkout Session

exports.createPayPalCheckoutSession =
    catchAsync(
        async (req, res, next) => {
            const taxPrice = 0;
            const shippingPrice = 0;

            const cart =
                await Cart.findById(
                    req.params.cartId
                ).populate(
                    "products.item"
                );

            if (!cart) {
                return next(
                    new ApiError(
                        req.t(
                            "order.noCart",
                            {
                                user: req
                                    .user
                                    ._id,
                            }
                        ),
                        StatusCodes.NOT_FOUND
                    )
                );
            }

            const cartPrice =
                cart.totalAfterDiscount !=
                null
                    ? Number(
                          cart.totalAfterDiscount
                      )
                    : Number(
                          cart.totalCartPrice
                      );

            const totalOrderPrice =
                taxPrice +
                shippingPrice +
                cartPrice;

            // ==========================================
            // 1. Find existing pending Order
            // ==========================================

            let order =
                await Order.findOne({
                    user: req.user._id,

                    cart: cart._id,

                    status: "pending",

                    isPaid: false,
                });

            // ==========================================
            // 2. Check expiration
            // ==========================================

            if (
                order &&
                order.expiresAt &&
                order.expiresAt <= new Date()
            ) {
                order.status = "expired";

                order.expiredAt = new Date();

                await order.save();

                order = null;
            }

            // ==========================================
            // 3. Create new Order if needed
            // ==========================================

            if (!order) {
                order =
                    await Order.create({
                        user: req.user._id,

                        cart: cart._id,

                        cartItems:
                            cart.products,

                        shippingAddress:
                            req.body
                                .shippingAddress,

                        taxPrice,

                        shippingPrice,

                        totalOrderPrice,

                        paymentMethodType:
                            "paypal",

                        isPaid: false,

                        status: "pending",

                        expiresAt:
                            new Date(
                                Date.now() +
                                    30 *
                                        60 *
                                        1000
                            ),
                    });
            }

            // ==========================================
            // 4. Reuse existing pending Order
            // ==========================================

            else {
                order.paymentMethodType =
                    "paypal";

                order.shippingAddress =
                    req.body
                        .shippingAddress;

                order.totalOrderPrice =
                    totalOrderPrice;

                order.expiresAt =
                    new Date(
                        Date.now() +
                            30 *
                                60 *
                                1000
                    );

                await order.save();
            }

            // ==========================================
            // 5. Create NEW PayPal payment attempt
            // ==========================================

            const amountInUSD =
                totalOrderPrice / 50;

            try {
                const paypalOrder =
                    await createPayPalOrder({
                        amount:
                            amountInUSD,

                        currency: "USD",

                        orderId:
                            order._id,
                    });

                // ==========================================
                // 6. Get PayPal approval URL
                // ==========================================

                const approvalLink =
                    paypalOrder.links.find(
                        (link) =>
                            link.rel ===
                            "approve"
                    )?.href;

                if (!approvalLink) {
                    throw new Error(
                        "PayPal did not return an approval URL"
                    );
                }

                // ==========================================
                // 7. Store CURRENT PayPal Order ID
                // ==========================================

                order.paymentIntentId =
                    paypalOrder.id;

                await order.save();

                // ==========================================
                // 8. Return checkout data
                // ==========================================

                return res
                    .status(
                        StatusCodes.OK
                    )
                    .json({
                        success: true,

                        message:
                            "PayPal checkout created successfully",

                        approvalUrl:
                            approvalLink,

                        orderId:
                            order._id,

                        paypalOrderId:
                            paypalOrder.id,

                        data: {
                            approvalUrl:
                                approvalLink,

                            orderId:
                                order._id,

                            paypalOrderId:
                                paypalOrder.id,
                        },
                    });
            } catch (error) {
                console.error(
                    "PayPal Checkout Error:",
                    error.response
                        ?.data ||
                        error.message
                );

                // لا نحذف الـ Order

                return next(
                    new ApiError(
                        error.message ||
                            "Failed to create PayPal checkout",
                        StatusCodes.BAD_REQUEST
                    )
                );
            }
        }
    );

// ==========================================================
// Verify + Capture PayPal Payment
// ==========================================================

// @desc Verify and Capture PayPal Payment
// after user approval

exports.verifyPayPalPayment =
    catchAsync(
        async (req, res, next) => {
            const {
                orderId,
                paypalOrderId,
            } = req.body;

            // ==========================================
            // 1. Find our Order
            // ==========================================

            const order =
                await Order.findById(
                    orderId
                );

            if (!order) {
                return next(
                    new ApiError(
                        req.t(
                            "order.notFound"
                        ),
                        StatusCodes.NOT_FOUND
                    )
                );
            }

            // ==========================================
            // 2. Make sure Order belongs to user
            // ==========================================

            const orderUserId =
                order.user?._id?.toString() ||
                order.user?.toString();

            const requestUserId =
                req.user._id.toString();

            if (
                orderUserId !==
                requestUserId
            ) {
                return next(
                    new ApiError(
                        "You are not allowed to capture this order",
                        StatusCodes.FORBIDDEN
                    )
                );
            }

            // ==========================================
            // 3. Already paid
            // ==========================================

            if (
                order.isPaid ||
                order.status === "paid"
            ) {
                return res.status(
                    StatusCodes.OK
                ).json({
                    success: true,

                    message:
                        req.t(
                            "order.alreadyPaid"
                        ),
                });
            }

            // ==========================================
            // 4. Order must be pending
            // ==========================================

            if (
                order.status !==
                "pending"
            ) {
                return next(
                    new ApiError(
                        "This order is no longer pending",
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // ==========================================
            // 5. Check expiration
            // ==========================================

            if (
                order.expiresAt &&
                order.expiresAt <=
                    new Date()
            ) {
                order.status =
                    "expired";

                order.expiredAt =
                    new Date();

                await order.save();

                return next(
                    new ApiError(
                        "This order has expired. Please start a new payment attempt.",
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // ==========================================
            // 6. Current PayPal payment must exist
            // ==========================================

            if (
                !order.paymentIntentId
            ) {
                return next(
                    new ApiError(
                        req.t(
                            "order.payPalIdNotFound"
                        ),
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // ==========================================
            // 7. Verify CURRENT PayPal Order ID
            // ==========================================

            if (
                !paypalOrderId ||
                paypalOrderId.toString() !==
                    order.paymentIntentId.toString()
            ) {
                return next(
                    new ApiError(
                        "This PayPal payment attempt is no longer valid.",
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // ==========================================
            // 8. Get PayPal Order Before Capture
            // ==========================================

            const paypalOrder =
                await getPayPalOrder(
                    order.paymentIntentId
                );

            // console.log(
            //     "========== PayPal Order Before Capture =========="
            // );

            // console.log(
            //     JSON.stringify(
            //         paypalOrder,
            //         null,
            //         2
            //     )
            // );

            // console.log(
            //     "================================================="
            // );

            // ==========================================
            // 9. Make sure PayPal Order is approved
            // ==========================================

            if (
                paypalOrder.status !==
                "APPROVED"
            ) {
                return next(
                    new ApiError(
                        `PayPal order is not ready for capture. Current status: ${paypalOrder.status}`,
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // ==========================================
            // 10. Capture CURRENT PayPal Order only
            // ==========================================

            const captureData =
                await capturePayPalPayment(
                    order.paymentIntentId
                );

            // ==========================================
            // 11. Verify Capture
            // ==========================================

            if (
                captureData.status !==
                "COMPLETED"
            ) {
                return next(
                    new ApiError(
                        req.t(
                            "order.paypalNotCompleted"
                        ),
                        StatusCodes.BAD_REQUEST
                    )
                );
            }

            // ==========================================
            // 12. Complete our Order atomically
            // ==========================================

            await handleOrderSuccess(
                order._id
            );

            return res.status(
                StatusCodes.OK
            ).json({
                success: true,

                message:
                    req.t(
                        "order.paypalCompleted"
                    ),
            });
        }
    );

// ==========================================================
// Paymob Webhook
// ==========================================================

// @desc Paymob Webhook

exports.paymobWebhook = catchAsync(
    async (req, res, next) => {
        try {
            const eventData = req.body;

            // --------------------------------------------------
            // 1. Validate Webhook Payload
            // --------------------------------------------------

            if (!eventData?.obj) {
                return res.status(
                    StatusCodes.OK
                ).json({
                    received: true,
                });
            }

            const transaction =
                eventData.obj;

            const intentionId =
                transaction.order?.id;

            if (!intentionId) {
                console.log(
                    "Paymob Webhook: intention/order ID not found"
                );

                return res.status(
                    StatusCodes.OK
                ).json({
                    received: true,
                });
            }

            // --------------------------------------------------
            // 2. Only Handle Successful Transactions
            // --------------------------------------------------

            if (
                eventData.type !==
                    "TRANSACTION" ||
                transaction.success !== true
            ) {
                return res.status(
                    StatusCodes.OK
                ).json({
                    received: true,
                });
            }

            // --------------------------------------------------
            // 3. Find Order Using Current Intention
            // --------------------------------------------------

            const order =
                await Order.findOne({
                    paymentIntentId:
                        intentionId,
                });

            if (!order) {
                console.log(
                    `Paymob Webhook: Order not found for intention ${intentionId}`
                );

                return res.status(
                    StatusCodes.OK
                ).json({
                    received: true,
                });
            }

            // --------------------------------------------------
            // 4. Prevent Duplicate Fulfillment
            // --------------------------------------------------

            if (
                order.isPaid ||
                order.status === "paid"
            ) {
                console.log(
                    `Paymob Webhook: Order ${order._id} is already paid`
                );

                return res.status(
                    StatusCodes.OK
                ).json({
                    received: true,
                });
            }

            // --------------------------------------------------
            // 5. Make Sure Order Is Still Pending
            // --------------------------------------------------

            if (
                order.status !==
                "pending"
            ) {
                console.log(
                    `Paymob Webhook: Order ${order._id} is not pending`
                );

                return res.status(
                    StatusCodes.OK
                ).json({
                    received: true,
                });
            }

            // --------------------------------------------------
            // 6. Complete Order
            // --------------------------------------------------

            await handleOrderSuccess(
                order._id
            );

            console.log(
                `Paymob Webhook: Order ${order._id} successfully completed`
            );

            // --------------------------------------------------
            // 7. Acknowledge Paymob
            // --------------------------------------------------

            return res.status(
                StatusCodes.OK
            ).json({
                received: true,
            });
        } catch (error) {
            console.error(
                "Paymob Webhook Error:",
                error.response
                    ?.data ||
                    error.message
            );

            return res.status(
                StatusCodes.OK
            ).json({
                received: true,
            });
        }
    }
);

// ==========================================================
// Get Specific Order
// ==========================================================

exports.getSpecificOrder =
    factory.getOne(Order, {
        modelName: "Order",

        translatableFields: [
            "cartItems.item.title",
            "cartItems.item.description",
        ],
    });

// ==========================================================
// Filter Orders For Logged User
// ==========================================================

exports.filterOrdersForLoggedUser =
    catchAsync(
        async (req, res, next) => {
            if (
                req.user.role ===
                "student"
            ) {
                req.filterObject = {
                    user: req.user._id,
                };
            }

            if (
                req.user.role ===
                "instructor"
            ) {
                const courseIds =
                    await Course.find({
                        instructor:
                            req.user._id,
                    }).distinct("_id");

                req.filterObject = {
                    cartItems: {
                        $elemMatch: {
                            itemType:
                                "Course",

                            item: {
                                $in: courseIds,
                            },
                        },
                    },
                };
            }

            next();
        }
    );

// ==========================================================
// Get All Orders
// ==========================================================

exports.getAllOrders =
    factory.getAll(Order, {
        modelName: "Order",

        translatableFields: [
            "cartItems.item.title",
            "cartItems.item.description",
        ],
    });

// ==========================================================
// Cancel Order
// ==========================================================

// @desc Handle Payment Cancellation

exports.cancelOrder = catchAsync(
    async (req, res, next) => {
        const order =
            await Order.findById(
                req.params.id
            );

        if (!order) {
            return next(
                new ApiError(
                    req.t("order.notFound"),
                    StatusCodes.NOT_FOUND
                )
            );
        }

        const orderUserId =
            order.user?._id ||
            order.user;

        if (
            orderUserId?.toString() !==
            req.user._id.toString()
        ) {
            return next(
                new ApiError(
                    "Unauthorized",
                    StatusCodes.FORBIDDEN
                )
            );
        }

        if (
            order.status ===
            "cancelled"
        ) {
            return next(
                new ApiError(
                    req.t(
                        "order.alreadyCancelled"
                    ),
                    StatusCodes.BAD_REQUEST
                )
            );
        }

        if (order.isPaid) {
            return next(
                new ApiError(
                    req.t(
                        "order.notCancelled"
                    ),
                    StatusCodes.BAD_REQUEST
                )
            );
        }

        order.status = "cancelled";

        order.cancelledAt =
            new Date();

        await order.save();

        sendResponse(res, {
            success: true,

            statusCode:
                StatusCodes.OK,

            message:
                req.t(
                    "order.cancelled"
                ),

            data: order,
        });
    }
);