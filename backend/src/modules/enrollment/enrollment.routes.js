const express = require('express');
const {
    getMyEnrollments,
    getMyPurchasedProducts,
    downloadPurchasedProduct,
    getAllEnrollments,
    getEnrollmentById,
} = require('./enrollment.controller');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const router = express.Router();

// مسارات خاصة بالمستخدم العادي
router.get(
    '/my-courses',
    isAuthenticatedUser,
    authorizeRoles('student'),
    getMyEnrollments
);
router.get(
    '/my-products',
    isAuthenticatedUser,
    authorizeRoles('student'),
    getMyPurchasedProducts
);
router.get(
    '/my-products/:productId/download',
    isAuthenticatedUser,
    authorizeRoles('student'),
    downloadPurchasedProduct
);

// مسارات متاحة للأدمن والـ Instructor (مع فلترة تلقائية داخل الكنترولر)
router.get(
    '/',
    isAuthenticatedUser,
    authorizeRoles('instructor', 'admin'),
    getAllEnrollments
);
router.get(
    '/:id',
    isAuthenticatedUser,
    authorizeRoles('instructor', 'admin'),
    getEnrollmentById
);

module.exports = router;
