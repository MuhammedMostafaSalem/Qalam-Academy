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

const {
    createCouponSchema,
    updateCouponSchema,
} = require("./coupon.schema");

const router = express.Router();

router
    .route("/")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        getCoupons
    )
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        validate(createCouponSchema),
        createCoupon
    );

router
    .route("/:id")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        getCoupon
    )
    .patch(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        validate(updateCouponSchema),
        updateCoupon
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        deleteCoupon
    );

module.exports = router;