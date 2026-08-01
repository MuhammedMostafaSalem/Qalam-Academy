const express = require('express');
const {
    getMyEnrollments,
    getMyPurchasedProducts,
    getAllEnrollments,
    getEnrollmentById,
} = require('./enrollment.controller');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const router = express.Router();

router.use(isAuthenticatedUser, authorizeRoles('student'));

// مسارات خاصة بالمستخدم العادي
router.get('/my-courses', getMyEnrollments);
router.get('/my-products', getMyPurchasedProducts);

// مسارات متاحة للأدمن، الـ Manager، والـ Instructor (مع فلترة تلقائية داخل الكنترولر)
router.get('/', authorizeRoles('instructor', "admin"), getAllEnrollments);
router.get('/:id', authorizeRoles('instructor', "admin"), getEnrollmentById);

module.exports = router;