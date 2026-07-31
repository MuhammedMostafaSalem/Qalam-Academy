const { StatusCodes } = require('http-status-codes');
const catchAsync = require("../../middlewares/catchAsync");
const Enrollment = require('./enrollment.model');
const Order = require('../order/orders.model');

// @desc    Get logged user enrolled courses (My Courses page)
// @route   GET /api/enrollments/my-courses
// @access  Private/User
exports.getMyEnrollments = catchAsync(async (req, res, next) => {
    const enrollments = await Enrollment.find({ user: req.user._id });

    res.status(StatusCodes.OK).json({
        status: 'success',
        results: enrollments.length,
        data: enrollments,
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        data: enrollments,
        meta: {
            totalEnrollments: enrollments.length,
        }
    });
});

// @desc    Get logged user purchased products/downloads (My Downloads page)
// @route   GET /api/enrollments/my-products
// @access  Private/User
exports.getMyPurchasedProducts = catchAsync(async (req, res, next) => {
    // بنجاح الدفع، بنجاب كل الأوردرات المدفوعة للمستخدم ونستخرج منها المنتجات فقط
    const orders = await Order.find({ user: req.user._id, isPaid: true }).populate({
        path: 'cartItems.item',
        match: { itemType: 'Product' }, // لو بنستخدم الـ RefPath أو ممكن نجيبها بتصفية مصفوفة الـ cartItems
    });

    // تصفية واستخراج المنتجات المشتراة وتجميعها
    let purchasedProducts = [];
    orders.forEach(order => {
        order.cartItems.forEach(item => {
            if (item.itemType === 'Product' && item.item) {
                purchasedProducts.push({
                    product: item.item,
                    count: item.count,
                    price: item.price,
                    purchasedAt: order.paidAt || order.createdAt,
                    orderId: order._id,
                });
            }
        });
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        data: purchasedProducts,
        meta: {
            totalProducts: purchasedProducts.length,
        }
    });
})