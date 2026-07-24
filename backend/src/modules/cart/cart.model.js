const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const cartItemSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true,
    },
});

cartItemSchema.pre("validate", function () {
    if ((this.course && this.product) || (!this.course && !this.product)) {
        throw new ApiError("Cart item must contain either course or product", StatusCodes.BAD_REQUEST);
    }
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    totalCartPrice: {
        type: Number,
        default: 0,
    },
    totalAfterDiscount: {
        type: Number,
        default: null,
    },
    cartOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    coupon: String,
},
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;