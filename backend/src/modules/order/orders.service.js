const { StatusCodes } = require("http-status-codes");
const Cart = require("../cart/cart.model");
const Order = require("./orders.model");
const ApiError = require("../../utils/ApiError");

// Create Order
exports.createOrder = async (userId, paymentMethod) => {
    const cart = await Cart.findOne({ cartOwner: userId })
        .populate({
            path: "items.course",
            select: "title slug thumbnail",
        })
        .populate({
            path: "items.product",
            select: "title slug image",
        });

    if (!cart) {
        throw new ApiError("Cart not found", StatusCodes.NOT_FOUND);
    }

    if (cart.items.length === 0) {
        throw new ApiError("Your cart is empty", StatusCodes.BAD_REQUEST);
    }

    if (cart.activeOrder) {
        const activeOrder = await Order.findById(cart.activeOrder);

        if (
            activeOrder &&
            activeOrder.paymentStatus === "pending" &&
            activeOrder.orderStatus === "pending"
        ) {
            throw new ApiError(
                "You already have a pending order for this cart. Please complete or cancel it first.",
                StatusCodes.CONFLICT
            );
        }

        // Clean broken reference
        cart.activeOrder = null;
        await cart.save();
    }

    const items = cart.items.map((item) => {
        if (item.course) {
            return {
                course: item.course._id,
                title: item.course.title,
                slug: item.course.slug,
                image: item.course.thumbnail,
                price: item.price,
            }
        }

        return {
            product: item.product._id,
            title: item.product.title,
            slug: item.product.slug,
            image: item.product.image,
            price: item.price,
        }
    });

    const order = await Order.create({
        user: userId,
        cart: cart._id,
        items,
        totalItems: items.length,
        totalPrice: cart.totalCartPrice,
        totalAfterDiscount: cart.totalAfterDiscount,
        coupon: cart.coupon,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
    });

    // Link cart with active order
    cart.activeOrder = order._id;

    await cart.save();

    return order;
}

// Get Logged User Orders
exports.getMyOrders = async (userId) => {
    return await Order.find({
        user: userId,
    })
        .select(
            "items totalItems totalPrice totalAfterDiscount coupon paymentMethod paymentStatus orderStatus createdAt"
        )
        .sort("-createdAt");
}

// Get Order By Id
exports.getOrderById = async (orderId, userId) => {
    const order = await Order.findOne({
        _id: orderId,
        user: userId,
    }).select("-createdBy");

    if (!order) {
        throw new ApiError("Order not found", StatusCodes.NOT_FOUND);
    }

    return order;
}

// Cancel Order
exports.cancelOrder = async (orderId, userId) => {
    const order = await Order.findOne({
        _id: orderId,
        user: userId,
    });

    if (!order) {
        throw new ApiError("Order not found", StatusCodes.NOT_FOUND);
    }

    if (order.paymentStatus !== "pending") {
        throw new ApiError("Only pending orders can be cancelled", StatusCodes.BAD_REQUEST);
    }

    if (order.orderStatus === "cancelled") {
        throw new ApiError("Order already cancelled", StatusCodes.BAD_REQUEST);
    }

    order.orderStatus = "cancelled";

    await order.save();

    const cart = await Cart.findById(order.cart);

    if (cart) {
        cart.activeOrder = null;
        await cart.save();
    }

    return order;
}

/*
    1- Payment Gateway Actions
    2- These methods are called by Webhooks
    3- after payment success or failure
*/
// Complete Order
exports.completeOrder = async (order, transactionId) => {
    order.paymentStatus = "paid";
    order.orderStatus = "completed";
    order.transactionId = transactionId;
    order.paidAt = new Date();

    await order.save();

    const cart = await Cart.findById(order.cart);

    if (cart) {
        cart.activeOrder = null;

        await cart.save();

        await cart.deleteOne();
    }

    return order;
};
// Fail Order
exports.failOrder = async (order) => {
    order.paymentStatus = "failed";

    await order.save();

    const cart = await Cart.findById(order.cart);

    if (cart) {
        cart.activeOrder = null;
        await cart.save();
    }

    return order;
};