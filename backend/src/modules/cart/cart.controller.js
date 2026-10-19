const catchAsync = require("../../middlewares/catchAsync");
const ApiError = require('../../utils/ApiError');
const sendResponse = require("../../utils/sendResponse");
const Product = require('../products/product.model');
const Course = require('../course/course.model');
const Cart = require('../cart/cart.model');
const Coupon = require('../coupon/coupon.model');
const Enrollment = require("../enrollment/enrollment.model");
const Order = require("../order/orders.model");
const { StatusCodes } = require('http-status-codes');
const translateDocument = require('../../utils/translateDocument');

const formatCartWithTranslations = (cart, language = 'ar') => {
    if (!cart) return cart;
    const cartObj = typeof cart.toObject === 'function' ? cart.toObject() : { ...cart };
    if (Array.isArray(cartObj.products)) {
        cartObj.products = cartObj.products.map((prod) => {
            if (prod.item && typeof prod.item === 'object') {
                prod.item = translateDocument(prod.item, language, [
                    'title',
                    'description',
                    'category.name',
                    'category.title',
                ]);
            }
            return prod;
        });
    }
    return cartObj;
};

// دالة حساب إجمالي السعر وتصفية الكوبون لو السعر اتغير
const calcTotalCartPrice = async (cart) => {
    let totalPrice = 0;
    cart.products.forEach((prod) => {
        // لو المنتج عليه discountPrice بنحسب على السعر المخفض، وإلا السعر العادي
        const currentPrice = prod.price;
        totalPrice += currentPrice * prod.count;
    });

    cart.totalCartPrice = totalPrice;
    cart.totalAfterDiscount = undefined;
    cart.coupon = undefined;

    await cart.save();
    return totalPrice;
}

// @desc    Add product/course to cart
// @route   POST /api/cart
// @access  Private/User

exports.addProductToCart = catchAsync(async (req, res, next) => {
    const { itemId, itemType } = req.body;

    // 1. Validate item type
    if (!["Product", "Course"].includes(itemType)) {
        return next(
            new ApiError(
                req.t("cart.validateitmeType"),
                StatusCodes.BAD_REQUEST
            )
        );
    }

    // 2. Find the requested item
    const Model = itemType === "Course" ? Course : Product;
    const dbItem = await Model.findById(itemId);

    if (!dbItem) {
        return next(
            new ApiError(
                req.t("cart.notDbItem", { type: itemType }),
                StatusCodes.NOT_FOUND
            )
        );
    }

    // 3. Check whether the user already owns this item
    if (itemType === "Course") {
        // Check if the user is already enrolled in this course
        const enrollmentExists = await Enrollment.exists({
            user: req.user._id,
            course: itemId,
        });

        if (enrollmentExists) {
            return next(
                new ApiError(
                    req.t("cart.alreadyHaveCourse"),
                    StatusCodes.CONFLICT
                )
            );
        }
    } else {
        // Check if the user already purchased this product
        const purchasedProduct = await Order.exists({
            user: req.user._id,
            $or: [
                { isPaid: true, status: "paid" },
                {
                    paymentStatus: "PAID",
                    orderStatus: "COMPLETED",
                },
            ],
            cartItems: {
                $elemMatch: {
                    item: itemId,
                    itemType: "Product",
                },
            },
        });

        if (purchasedProduct) {
            return next(
                new ApiError(
                    req.t("cart.alreadyHaveProduct"),
                    StatusCodes.CONFLICT
                )
            );
        }
    }

    // 4. Determine current item price
    const itemPrice =
        dbItem.discountPrice > 0
            ? dbItem.discountPrice
            : dbItem.price;

    // 5. Find the user's cart
    let cart = await Cart.findOne({
        cartOwner: req.user._id,
    });

    if (cart) {
        // 6. Check whether the item already exists in the cart
        const itemIndex = cart.products.findIndex(
            (product) =>
                product.item.toString() === itemId &&
                product.itemType === itemType
        );

        if (itemIndex > -1) {
            // Products can increase quantity; courses remain quantity 1
            if (itemType === "Product") {
                cart.products[itemIndex].count += 1;
            }
        } else {
            // Add new item to existing cart
            cart.products.push({
                item: itemId,
                itemType,
                price: itemPrice,
                count: 1,
            });
        }
    } else {
        // 7. Create a new cart
        cart = await Cart.create({
            cartOwner: req.user._id,
            products: [
                {
                    item: itemId,
                    itemType,
                    price: itemPrice,
                    count: 1,
                },
            ],
        });
    }

    // 8. Recalculate cart totals
    await calcTotalCartPrice(cart);

    // 9. Return response
    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("cart.created"),
        data: cart,
        meta: {
            totalCart: cart.products.length,
        },
    });
});

// @desc    Get logged user cart
// @route   GET /api/cart
// @access  Private/User
exports.getLoggedUserCart = catchAsync(async (req, res, next) => {
    const cart = await Cart.findOne({ cartOwner: req.user._id })
        .populate({
            path: 'products.item',
            select: 'title slug description image thumbnail price discountPrice category', // بنجيب الحقول المشتركة أو حسب المتاح
        });

    if (!cart) {
        return next(new ApiError(req.t("cart.exist", {
            user: req.user._id
        }), StatusCodes.NOT_FOUND));
    }

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        data: formatCartWithTranslations(cart, req.language),
        meta: {
            totalCart: cart.products.length
        }
    });
});

// @desc    Remove product from cart
// @route   DELETE /api/cart/:itemId
// @access  Private/User
exports.removeCartProduct = catchAsync(async (req, res, next) => {
    const { itemId } = req.params;
    const cart = await Cart.findOneAndUpdate(
        { cartOwner: req.user._id },
        {
            $pull: { products: { _id: itemId } },
        },
        { new: true }
    ).populate({
        path: 'products.item',
        select: 'title image thumbnail category',
        populate: { path: 'category', select: 'name -_id', model: 'Category' },
    });

    if (!cart) {
        return next(new ApiError(req.t("cart.notFound"), StatusCodes.NOT_FOUND));
    }

    // Calculate total cart price
    await calcTotalCartPrice(cart);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("cart.deleted"),
        // data: cart,
        // meta: {
        //     totalCart: cart.products.length
        // }
    });
});

// @desc    Clear logged user cart
// @route   DELETE /api/cart
// @access  Private/User
exports.clearLoggedUserCart = catchAsync(async (req, res, next) => {
    await Cart.findOneAndDelete({ cartOwner: req.user._id });

    // res.status(StatusCodes.NO_CONTENT).send();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("cart.cleared"),
    });
});

// @desc    Update product quantity in cart
// @route   PUT /api/cart/:itemId
// @access  Private/User
exports.updateCartProductCount = catchAsync(async (req, res, next) => {
    const { itemId } = req.params;
    const { count } = req.body;

    const cart = await Cart.findOne({ cartOwner: req.user._id })
        .populate({
            path: 'products.item',
            select: 'title image thumbnail category',
            populate: { path: 'category', select: 'name -_id', model: 'Category' },
        });

    if (!cart) {
        return next(new ApiError(req.t("cart.exist", {
            user: req.user._id
        }), StatusCodes.NOT_FOUND));
    }

    const itemIndex = cart.products.findIndex(
        (item) => item._id.toString() === itemId
    );

    if (itemIndex > -1) {
        const productItem = cart.products[itemIndex];
        productItem.count = count;
        cart.products[itemIndex] = productItem;
    } else {
        return next(
            new ApiError(req.t("cart.itemFound", {
                id: itemId
            }), StatusCodes.NOT_FOUND)
        );
    }

    await calcTotalCartPrice(cart);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        data: formatCartWithTranslations(cart, req.language),
        meta: {
            totalCart: cart.products.length
        }
    });
});

// @desc    Apply coupon to logged user cart
// @route   PUT /api/cart/applyCoupon
// @access  Private/User
exports.applyCouponToCart = catchAsync(async (req, res, next) => {
    const { couponName } = req.body;

    // 1) Get coupon based on its unique name and expire date > now
    const coupon = await Coupon.findOne({
        name: couponName,
        expire: { $gt: Date.now() },
    });

    const cart = await Cart.findOne({ cartOwner: req.user._id })
        .populate({
            path: 'products.item',
            select: 'title image thumbnail category',
            populate: { path: 'category', select: 'name -_id', model: 'Category' },
        });

    if (!cart) {
        return next(new ApiError(req.t("cart.notFound"), StatusCodes.NOT_FOUND));
    }

    if (!coupon) {
        cart.totalAfterDiscount = undefined;
        cart.coupon = undefined;
        await cart.save();
        return next(new ApiError(req.t("cart.invalidCoupon"), StatusCodes.BAD_REQUEST));
    }

    const totalPrice = await calcTotalCartPrice(cart);

    // Calculate total price after discount
    const totalAfterDiscount = (
        totalPrice -
        (totalPrice * coupon.discount) / 100
    ).toFixed(2);

    cart.totalAfterDiscount = totalAfterDiscount;
    cart.coupon = coupon.name;

    await cart.save();

    return res.status(StatusCodes.OK).json({
        status: 'success',
        coupon: coupon.name,
        data: formatCartWithTranslations(cart, req.language),
        meta: {
            totalCart: cart.products.length
        }
    });
});

// @desc    Apply coupon to logged user cart
// @route   PUT /api/cart/removeCoupon
// @access  Private/User
// Remove Coupon
exports.removeCoupon = catchAsync(async (req, res) => {
    const cart = await Cart.findOne({
        cartOwner: req.user.id,
    });

    if (!cart) {
        throw new ApiError(req.t("cart.notFound"), StatusCodes.NOT_FOUND);
    }

    cart.coupon = null;
    cart.totalAfterDiscount = null;

    await calcTotalCartPrice(cart);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("cart.removeCoupon"),
    });
});