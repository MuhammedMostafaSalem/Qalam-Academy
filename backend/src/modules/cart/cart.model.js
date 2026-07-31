const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: 'products.itemType' // مرن جداً بيحدد الموديل بناءً على الـ itemType
                },
                itemType: {
                    type: String,
                    required: true,
                    enum: ['Product', 'Course']
                },
                count: {
                    type: Number,
                    default: 1,
                    min: [1, 'Quantity can not be less than 1']
                },
                price: {
                    type: Number,
                    required: true
                },
            },
        ],
        totalCartPrice: {
            type: Number,
            default: 0
        },
        totalAfterDiscount: {
            type: Number,
            default: null
        },
        cartOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Cart must belong to a user'],
            index: true,
        },
        coupon: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true
    }
);

// Optional: لو حابب تعمل Populate أوتوماتيك لكل queries الـ Find ممكن تفعل الـ Middleware دي
/*
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.product',
    select: 'title image price discountPrice category',
    populate: { path: 'category', select: 'name -_id', model: 'Category' },
  });
  next();
});
*/

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;