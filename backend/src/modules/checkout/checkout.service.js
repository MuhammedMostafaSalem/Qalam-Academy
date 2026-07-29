const { StatusCodes } = require("http-status-codes");
const Cart = require("../cart/cart.model");
const ApiError = require("../../utils/ApiError");
const { createOrder } = require("../order/orders.service");
const { PAYMENT_METHODS } = require("../payment/payment.constants");

// Review Checkout
exports.reviewCheckout = async (userId) => {
    const cart = await Cart.findOne({
        cartOwner: userId,
    })
        .populate({
            path: "items.course",
            select: "title slug thumbnail price discountPrice",
        })
        .populate({
            path: "items.product",
            select: "title slug image price discountPrice",
        });

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    if (cart.items.length === 0) {
        throw new ApiError("Your cart is empty", StatusCodes.BAD_REQUEST);
    }

    return {
        items: cart.items,
        totalItems: cart.items.length,
        totalPrice: cart.totalCartPrice,
        totalAfterDiscount: cart.totalAfterDiscount,
        coupon: cart.coupon,

        paymentMethods: Object.values(PAYMENT_METHODS),
    };
}

// Create Checkout Session
exports.createCheckoutSession = async (userId, paymentMethod) => {
    const order = await createOrder(userId, paymentMethod);

    return {
        orderId: order._id,
        paymentMethod,

        paymentStatus: order.paymentStatus,

        message: "Order created successfully. Continue to payment.",

        // سيتم استبدالها عند ربط بوابة الدفع
        paymentUrl: null,
    };
}