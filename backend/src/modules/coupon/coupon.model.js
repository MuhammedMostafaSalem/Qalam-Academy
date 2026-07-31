const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Coupon name required'],
            unique: true,
            uppercase: true, // بنخلي اسم الكوبون دايماً حروف كبيرة لتسهيل المقارنة
        },
        expire: {
            type: Date,
            required: [true, 'Coupon expire time required'],
        },
        discount: {
            type: Number,
            required: [true, 'Coupon discount percentage required'],
            min: [1, 'Discount must be at least 1%'],
            max: [100, 'Discount cannot exceed 100%'],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;