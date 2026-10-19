const mongoose = require("mongoose");

// const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Order must belong to a user"],
        },

        // الـ Cart الذي تم إنشاء الـ Order منه
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
            index: true,
        },

        cartItems: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: "cartItems.itemType",
                },

                itemType: {
                    type: String,
                    required: true,
                    enum: ["Product", "Course"],
                },

                count: {
                    type: Number,
                    default: 1,
                },

                price: Number,
            },
        ],

        shippingAddress: {
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        },

        taxPrice: {
            type: Number,
            default: 0,
        },

        shippingPrice: {
            type: Number,
            default: 0,
        },

        totalOrderPrice: {
            type: Number,
            default: 0,
        },

        paymentMethodType: {
            type: String,
            enum: ["card", "wallet", "fawry", "cash", "paypal"],
            required: true,
        },

        // Paymob Intention ID أو PayPal Order ID
        paymentIntentId: {
            type: String,
            default: null,
        },

        paymentProofImage: {
            type: String,
            default: null,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["pending", "paid", "cancelled", "expired"],
            default: "pending",
            index: true,
        },

        // الوقت الذي ينتهي فيه الـ Pending Order
        expiresAt: {
            type: Date,
            default: null,
            index: true,
        },

        paidAt: {
            type: Date,
            default: null,
        },

        cancelledAt: {
            type: Date,
            default: null,
        },

        expiredAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.pre(/^find/, function () {
    this.populate({
        path: "user",
        select: "firstName lastName avatar email phone",
    }).populate({
        path: "cartItems.item",
        select: "title description image pdf averageRating",
    });
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;