// const { StatusCodes } = require('http-status-codes');
// const catchAsync = require('../../middlewares/catchAsync');
// const factory = require('../../utils/crudFactory');
// const ApiError = require('../../utils/ApiError');
// const Review = require('./review.model');
// const Enrollment = require('../enrollment/enrollment.model');

// // Middleware للفلترة في حالة الـ Nested Routes (مثل /api/v1/courses/:courseId/reviews)
// exports.createFilterObj = (req, res, next) => {
//     let filter = {};
//     if (req.params.courseId) filter = { course: req.params.courseId };
//     req.filterObject = filter;
//     next();
// };

// // تحديد الـ courseId والـ userId تلقائياً قبل الإنشاء
// exports.setCourseAndUserIds = (req, res, next) => {
//     if (!req.body.course) req.body.course = req.params.courseId;
//     if (!req.body.user) req.body.user = req.user._id;
//     next();
// };

// // **دالة التحقق من الاشتراك باستخدام beforeCreate**
// const checkIfUserEnrolled = async ({ req, Model }) => {
//     const courseId = req.body.course;
//     const userId = req.user._id;

//     // التحقق من وجود Enrollment نشط للمستخدم في هذا الكورس
//     const enrollment = await Enrollment.findOne({ user: userId, course: courseId });

//     if (!enrollment) {
//         throw new ApiError(
//             'You are not allowed to review this course because you are not enrolled in it.',
//             StatusCodes.FORBIDDEN
//         );
//     }
// }

// // @desc    Get all reviews for courses
// exports.getCourseReviews = factory.getAll(Review, {
//     modelName: "Reviews",
//     populate: {
//         path: 'user',
//         select: 'firstName lastName slug avatar email'
//     }
// });

// // @desc    Get specific review by id
// exports.getCourseReview = factory.getOne(Review, {
//     modelName: "Review",
//     populate: {
//         path: 'user',
//         select: 'firstName lastName slug avatar email'
//     }
// });

// // @desc    Create review (with enrollment check)
// exports.createCourseReview = factory.createOne(Review, {
//     modelName: "Review",
//     beforeCreate: checkIfUserEnrolled,
// });

// // @desc    Update review (فقط صاحب التقييم يمكنه التعديل)
// exports.updateCourseReview = factory.updateOne(Review, {
//     modelName: "Review",
// });

// // @desc    Delete review (صاحب التقييم أو الأدمن)
// exports.deleteCourseReview = factory.deleteOne(Review, {
//     modelName: "Review",
// });

const Review = require("./review.model");
const factory = require("../../utils/crudFactory");
const {
    checkReviewPermission,
    calculateCourseRatings,
} = require("./review.service");

// Create Review
exports.createReview = async (req, res, next) => {
    await checkReviewPermission(
        req.user.id,
        req.body.course
    );

    req.body.user = req.user.id;

    return factory.createOne(Review, {
        modelName: "Review",
        afterCreate: async ({ document }) => {
            await calculateCourseRatings(document.course);
        },
    })(req, res, next);
}

// Update Review
exports.updateReview = factory.updateOne(Review, {
    modelName: "Review",
    afterUpdate: async ({ document }) => {
        await calculateCourseRatings(document.course);
    }
});

// Delete Review
exports.deleteReview = factory.deleteOne(Review, {
    modelName: "Review",
    afterDelete: async ({ document }) => {
        await calculateCourseRatings(document.course);
    }
});

// Get Review
exports.getReview = factory.getOne(Review, {
    modelName: "Review",
    translatableFields: [
        "course.title",
    ],
    populate: [
        {
            path: "user",
            select: "firstName lastName slug avatar email",
        },
        {
            path: "course",
            select: "title slug thumbnail",
        },
    ]
});

// Get Reviews
exports.getReviews = factory.getAll(Review, {
    modelName: "Review",
    translatableFields: [
        "course.title",
    ],
    populate: [
        {
            path: "user",
            select: "firstName lastName slug avatar email",
        },
        {
            path: "course",
            select: "title slug thumbnail",
        },
    ]
});