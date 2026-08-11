const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Enrollment must belong to a user'],
            index: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Enrollment must belong to a course'],
            index: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: [true, 'Enrollment must belong to an order'],
        },
        progress: {
            type: Number,
            default: 0, // نسبة إتمام الكورس
            min: 0,
            max: 100,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// لمنع تسجيل نفس المستخدم في نفس الكورس أكثر من مرة
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Populate أوتوماتيك لبيانات الكورس عند الاستعلام
enrollmentSchema.pre(/^find/, function () {
    this.populate({
        path: 'user',
        select: 'firstName lastName email phone avatar slug role',
    })
    .populate({
        path: 'course',
        select: 'title description thumbnail slug category instructor',
        populate: [
            {
                path: 'category',
                select: 'title description image slug type',
            },
            {
                path: 'instructor',
                select: 'firstName lastName email avatar slug',
            },
        ],
    })
    .populate({
        path: 'order',
        select: 'user cartItems shippingAddress taxPrice shippingPrice totalOrderPrice paymentMethodType paymentIntentId isPaid status paidAt createdAt updatedAt',
    });
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;