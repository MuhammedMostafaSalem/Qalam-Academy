const express = require("express");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middlewares/auth");

const validate = require("../../middlewares/validate");

const {
    createCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon,
} = require("./coupon.controller");

const router = express.Router();

// حماية جميع مسارات الكوبونات وتحديد الصلاحيات للأدمن والمدير فقط
router.use(isAuthenticatedUser, authorizeRoles('admin', 'instructor'));

router
    .route("/")
    .get(getCoupons)
    .post(createCoupon);

router
    .route("/:id")
    .get(getCoupon)
    .patch(updateCoupon)
    .delete(deleteCoupon);

module.exports = router;