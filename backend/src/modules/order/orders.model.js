const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user'],
    },
    cartItems: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'cartItems.itemType'
            },
            itemType: {
                type: String,
                required: true,
                enum: ['Product', 'Course']
            },
            count: {
                type: Number,
                default: 1
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
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
    },
    totalOrderPrice: {
        type: Number,
        default: 0.0,
    },
    paymentMethodType: {
        type: String,
        enum: ['card', 'wallet', 'fawry', 'cash', 'paypal'],
        required: true,
    },
    paymentIntentId: {
        type: String, // هنحفظ فيه الـ Paymob Intention ID أو Client Secret للتعقب
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending',
    },
    paidAt: Date,
}, {
    timestamps: true
});

orderSchema.pre(/^find/, function () {
    this.populate({
        path: 'user',
        select: 'firstName lastName avatar email phone',
    }).populate({
        path: 'cartItems.item',
        select: 'title image averageRating',
    });
});

// orderSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;