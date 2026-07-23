const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        uppercase: true,
        unique: true,
        required: true,
    },
    expire: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },

    // Maximum coupon usage limit
    usageLimit: {
        type: Number,
        required: true,
        default: 1,
    },

    // Current number of uses
    usedCount: {
        type: Number,
        default: 0,
    },

    // Number of uses per user
    perUserLimit: {
        type: Number,
        default: 1,
    },

    usersUsed: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            count: {
                type: Number,
                default: 1,
            },

            usedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    // Status
    isActive: {
        type: Boolean,
        default: false,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;