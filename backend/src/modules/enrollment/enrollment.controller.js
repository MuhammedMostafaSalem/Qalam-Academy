const { StatusCodes } = require('http-status-codes');
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const ApiError = require('../../utils/ApiError');
const factory = require('../../utils/crudFactory');
const Enrollment = require('./enrollment.model');
const Order = require('../order/orders.model');
const Course = require('../course/course.model');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../products/product.model');

const translateDocument = require('../../utils/translateDocument');

// 1- عرض تسجيلات الكورسات (Admin يشوف الكل، Instructor يشوف كورساته فقط)
exports.getAllEnrollments = catchAsync(async (req, res, next) => {
    let filter = {};
    let requestedCourse = null;

    if (req.query.course) {
        const courseReference = req.query.course;
        const courseQuery = mongoose.Types.ObjectId.isValid(courseReference)
            ? { _id: courseReference }
            : { slug: courseReference };

        requestedCourse = await Course.findOne(courseQuery).select('_id');

        if (!requestedCourse) {
            throw new ApiError(req.t('course.notFound'), StatusCodes.NOT_FOUND);
        }
    }

    // لو المستخدم الحالي Instructor (وليس Admin أو Manager)
    if (req.user.role === 'instructor') {
        // أولاً: نجيب كل الكورسات التي يمتلكها أو يدرسها هذا الـ Instructor
        const instructorCourses = await Course.find({ instructor: req.user._id }).select('_id');
        const courseIds = instructorCourses.map(course => course._id);

        // ثانياً: نجيب التسجيلات (Enrollments) الخاصة فقط بهذه الكورسات
        if (requestedCourse) {
            const canAccessCourse = courseIds.some(
                (courseId) => courseId.toString() === requestedCourse._id.toString()
            );
            filter = { course: canAccessCourse ? requestedCourse._id : { $in: [] } };
        } else {
            filter = { course: { $in: courseIds } };
        }
    } else if (requestedCourse) {
        filter = { course: requestedCourse._id };
    }

    // بناء الاستعلام باستخدام الـ Factory أو مباشرة
    const documentsCount = await Enrollment.countDocuments(filter);

    const enrollments = await Enrollment.find(filter)
        .populate({
            path: 'course',
            select: 'title slug thumbnail duration totalLessons price instructor level category',
            populate: [
                { path: 'instructor', select: 'firstName lastName avatar' },
                { path: 'category', select: 'title slug' }
            ]
        })
        .populate('user', 'firstName lastName email avatar');

    const translatedEnrollments = enrollments.map((enr) => {
        const enrObj = typeof enr.toObject === 'function' ? enr.toObject() : { ...enr };
        if (enrObj.course) {
            enrObj.course = translateDocument(enrObj.course, req.language, [
                'title',
                'description',
                'category.title',
            ]);
        }
        return enrObj;
    });

    sendResponse(res, {
        success: true,
        message: req.t("enrollment.fetched"),
        statusCode: StatusCodes.OK,
        results: enrollments.length,
        data: translatedEnrollments,
        meta: {
            totalEnrollments: documentsCount,
        }
    });
});

// @desc    Get logged user enrolled courses (My Courses page)
// @route   GET /api/enrollments/my-courses
// @access  Private/User
exports.getMyEnrollments = catchAsync(async (req, res, next) => {
    const enrollments = await Enrollment.find({ user: req.user._id })
        .populate({
            path: 'course',
            select: 'title slug thumbnail duration totalLessons price instructor level category',
            populate: [
                { path: 'instructor', select: 'firstName lastName avatar' },
                { path: 'category', select: 'title slug' }
            ]
        });

    const translatedEnrollments = enrollments.map((enr) => {
        const enrObj = typeof enr.toObject === 'function' ? enr.toObject() : { ...enr };
        if (enrObj.course) {
            enrObj.course = translateDocument(enrObj.course, req.language, [
                'title',
                'description',
                'category.title',
            ]);
        }
        return enrObj;
    });

    sendResponse(res, {
        success: true,
        message: req.t("enrollment.fetched"),
        statusCode: StatusCodes.OK,
        data: translatedEnrollments,
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
        });
    
    // تصفية واستخراج المنتجات المشتراة وتجميعها
    let purchasedProducts = [];
    orders.forEach(order => {
        order.cartItems.forEach(item => {
            if (item.itemType === 'Product' && item.item) {
                const translatedProduct = translateDocument(item.item, req.language, [
                    'title',
                    'description',
                ]);

                purchasedProducts.push({
                    _id: `${order._id}-${item.item._id}`,
                    product: translatedProduct,
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
        message: req.t("enrollment.fetched"),
        statusCode: StatusCodes.OK,
        data: purchasedProducts,
        meta: {
            totalProducts: purchasedProducts.length,
        }
    });
});

// @desc    Download a purchased product file
// @route   GET /api/enrollments/my-products/:productId/download
// @access  Private/Student who purchased the product
exports.downloadPurchasedProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ApiError(req.t('product.notFound'), StatusCodes.NOT_FOUND));
    }

    const purchased = await Order.exists({
        user: req.user._id,
        isPaid: true,
        status: 'paid',
        cartItems: {
            $elemMatch: {
                item: productId,
                itemType: 'Product',
            },
        },
    });

    if (!purchased) {
        return next(new ApiError(req.t('enrollment.downloadNotAllowed'), StatusCodes.FORBIDDEN));
    }

    const product = await Product.findById(productId).select('title pdf');

    if (!product?.pdf) {
        return next(new ApiError(req.t('enrollment.fileNotFound'), StatusCodes.NOT_FOUND));
    }

    let pathname = product.pdf;
    try {
        if (/^https?:\/\//i.test(pathname)) pathname = new URL(pathname).pathname;
        pathname = decodeURIComponent(pathname);
    } catch {
        return next(new ApiError(req.t('enrollment.fileNotFound'), StatusCodes.NOT_FOUND));
    }

    const uploadsMarker = '/uploads/';
    const markerIndex = pathname.indexOf(uploadsMarker);
    if (markerIndex === -1) {
        return next(new ApiError(req.t('enrollment.fileNotFound'), StatusCodes.NOT_FOUND));
    }

    const relativePath = pathname.slice(markerIndex + uploadsMarker.length);
    const uploadsRoot = path.resolve(__dirname, '..', '..', 'uploads');
    const filePath = path.resolve(uploadsRoot, relativePath);

    if (!filePath.startsWith(`${uploadsRoot}${path.sep}`) || !fs.existsSync(filePath)) {
        return next(new ApiError(req.t('enrollment.fileNotFound'), StatusCodes.NOT_FOUND));
    }

    const localizedTitle = product.title?.[req.language] || product.title?.en || product.title?.ar || 'download';
    const safeTitle = localizedTitle.replace(/[\\/:*?"<>|]+/g, '-').trim() || 'download';
    const extension = path.extname(filePath) || '.pdf';
    const downloadName = safeTitle.toLowerCase().endsWith(extension.toLowerCase())
        ? safeTitle
        : `${safeTitle}${extension}`;

    return res.download(filePath, downloadName, (error) => {
        if (error && !res.headersSent) next(error);
    });
});

// 4- عرض تفاصيل تسجيل معين بالـ ID بتاعه (خاص بالأدمن)
exports.getEnrollmentById = factory.getOne(Enrollment, {
    modelName: 'enrollment'
});
