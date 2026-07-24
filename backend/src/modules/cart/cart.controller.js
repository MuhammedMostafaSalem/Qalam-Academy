const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const {
    addToCart,
    getLoggedUserCart,
    removeCartItem,
    clearCart,
    applyCouponToCart,
    removeCouponFromCart
} = require("./cart.service");

// Add course/product to cart
exports.addToCart = catchAsync(async (req, res) => {
    const cart = await addToCart(req.user.id, req.body);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Item added to cart successfully",
        data: cart,
    });
});

// Get logged user cart
exports.getMyCart = catchAsync(async (req, res) => {
    const cart = await getLoggedUserCart(req.user.id);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Cart fetched successfully",
        data: cart,
        meta: {
            total: cart.items.length,
        },
    });
});

// Remove one item from cart
exports.removeCartItem = catchAsync(async (req, res) => {
    await removeCartItem(req.user.id, req.params.itemId);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Item removed from cart successfully",
    });
});

// Clear cart
exports.clearCart = catchAsync(async (req, res) => {
    await clearCart(req.user.id);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Cart cleared successfully",
    });
});

// Apply coupon
exports.applyCoupon = catchAsync(async (req, res) => {
    const cart = await applyCouponToCart(req.user.id, req.body.coupon);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Coupon applied successfully",
        data: cart,
    });
});

// Remove Coupon
exports.removeCoupon = catchAsync(async (req, res) => {
    await removeCouponFromCart(req.user.id);

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Coupon removed successfully",
    });
})