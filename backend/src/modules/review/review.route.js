// const express = require('express');
// const {
//     getCourseReviews,
//     getCourseReview,
//     createCourseReview,
//     updateCourseReview,
//     deleteCourseReview,
//     createFilterObj,
//     setCourseAndUserIds,
//     checkIfUserEnrolled,
// } = require('./review.controller');

// const {
//     isAuthenticatedUser,
//     authorizeRoles
// } = require('../../middlewares/auth');

// // mergeParams: true للسماح بقراءة courseId من الراوتر الأب (Nested Route)
// const router = express.Router({ mergeParams: true });

// router.use(isAuthenticatedUser);

// router.route('/')
//     .get(createFilterObj, getCourseReviews)
//     .post(
//         authorizeRoles('student'), // الطالب فقط هو من يقيّم
//         setCourseAndUserIds,
//         createCourseReview
//     );

// router.route('/:id')
//     .get(getCourseReview)
//     .patch(
//         authorizeRoles('student', 'admin'),
//         updateCourseReview
//     )
//     .delete(
//         authorizeRoles('student', 'admin'),
//         deleteCourseReview
//     );

// module.exports = router;

const express = require("express");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const validate = require("../../middlewares/validate");

const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
} = require("./review.controller");

const {
    createReviewSchema,
    updateReviewSchema,
} = require("./review.schema");

const router = express.Router();


// =========================
// Public
// =========================

// Get All Reviews
router
    .route("/")
    .get(getReviews);

// Get Single Review
router
    .route("/:id")
    .get(getReview);


// =========================
// Authenticated Users
// =========================

// Create Review
router
    .route("/")
    .post(
        isAuthenticatedUser,
        authorizeRoles('student'),
        validate(createReviewSchema),
        createReview
    );

// Update Review
router
    .route("/:id")
    .patch(
        isAuthenticatedUser,
        authorizeRoles('student', 'admin'),
        validate(updateReviewSchema),
        updateReview
    );

// Delete Review
router
    .route("/:id")
    .delete(
        isAuthenticatedUser,
        authorizeRoles("student", "admin"),
        deleteReview
    );

module.exports = router;