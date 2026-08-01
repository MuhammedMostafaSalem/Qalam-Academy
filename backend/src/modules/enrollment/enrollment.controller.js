const { StatusCodes } = require('http-status-codes');
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const ApiError = require('../../utils/ApiError');
const factory = require('../../utils/crudFactory');
const Enrollment = require('./enrollment.model');
const Order = require('../order/orders.model');
const Course = require('../course/course.model');

// 1- عرض تسجيلات الكورسات (Admin يشوف الكل، Instructor يشوف كورساته فقط)
exports.getAllEnrollments = catchAsync(async (req, res, next) => {
    let filter = {};

    // لو المستخدم الحالي Instructor (وليس Admin أو Manager)
    if (req.user.role === 'instructor') {
        // أولاً: نجيب كل الكورسات التي يمتلكها أو يدرسها هذا الـ Instructor
        const instructorCourses = await Course.find({ instructor: req.user._id }).select('_id');
        const courseIds = instructorCourses.map(course => course._id);

        // ثانياً: نجيب التسجيلات (Enrollments) الخاصة فقط بهذه الكورسات
        filter = { course: { $in: courseIds } };
    }

    // بناء الاستعلام باستخدام الـ Factory أو مباشرة
    const documentsCount = await Enrollment.countDocuments(filter);

    // استخدام الـ ApiFeatures لو متاح عندك في المشروع، أو جلب البيانات مباشرة مع الـ Populate
    let query = Enrollment.find(filter);

    // لو بتستخدم نظام Pagination أو Filter مخصص يقدر الـ factory يكمله، أو نعمله كالتالي:
    const enrollments = await query;

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        results: enrollments.length,
        data: enrollments,
        meta: {
            totalEnrollments: documentsCount,
        }
    });
});

// @desc    Get logged user enrolled courses (My Courses page)
// @route   GET /api/enrollments/my-courses
// @access  Private/User
exports.getMyEnrollments = catchAsync(async (req, res, next) => {
    const enrollments = await Enrollment.find({ user: req.user._id });

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
    const orders = await Order.find({ user: req.user._id, isPaid: true, status: 'paid' })
        .populate({
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
});

// 4- عرض تفاصيل تسجيل معين بالـ ID بتاعه (خاص بالأدمن)
exports.getEnrollmentById = factory.getOne(Enrollment, { modelName: 'Enrollment' });