const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../utils/ApiError");

const orderItemSchema = new mongoose.Schema({
    // Reference
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: null,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null,
    },

    // Snapshot
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: null,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    _id: false,
});

orderItemSchema.pre("validate", function () {
    if (
        (this.course && this.product) ||
        (!this.course && !this.product)
    ) {
        throw new ApiError("Order item must contain either course or product", StatusCodes.BAD_REQUEST);
    }
});

// Main Order
const orderSchema = new mongoose.Schema({
    // Cart Reference
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
        index: true,
    },
    // Owner
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // Purchased Items
    items: {
        type: [orderItemSchema],
        validate: {
            validator: (value) => value.length > 0,
            message: "Order must contain at least one item",
        },
    },

    totalItems: {
        type: Number,
        default: 0,
        min: 0,
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },

    totalAfterDiscount: {
        type: Number,
        default: null,
        min: 0,
    },

    coupon: {
        type: String,
        default: null,
    },

    paymentMethod: {
        type: String,
        enum: [
            "card",
            "vodafone_cash",
            "etisalat_cash",
            "orange_cash",
            "fawry",
            "paypal",
        ],
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "failed",
            "refunded",
        ],
        default: "pending",
    },

    transactionId: {
        type: String,
        default: null,
    },

    paidAt: {
        type: Date,
        default: null,
    },

    orderStatus: {
        type: String,
        enum: [
            "pending",
            "processing",
            "completed",
            "cancelled",
        ],
        default: "pending",
    },

    // Admin
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {
    timestamps: true,
});

orderSchema.index({
    user: 1,
    createdAt: -1,
});

orderSchema.index({
    cart: 1,
    paymentStatus: 1,
    orderStatus: 1,
});

orderSchema.index({
    transactionId: 1,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;