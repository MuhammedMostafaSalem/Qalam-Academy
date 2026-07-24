const express = require("express");

const { isAuthenticatedUser } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const {
    getMyCart,
    addToCart,
    applyCoupon,
    removeCartItem,
    clearCart,
    removeCoupon
} = require("./cart.controller");

const {
    addToCartSchema,
    applyCouponSchema
} = require("./cart.schema");

const router = express.Router();

router.use(isAuthenticatedUser);

// Get Cart
router
    .route("/")
    .get(getMyCart);

// Add To Cart
router
    .route("/add")
    .post(
        validate(addToCartSchema),
        addToCart
    );

// Apply Coupon
router
    .route("/apply-coupon")
    .patch(
        validate(applyCouponSchema),
        applyCoupon
    );

// Remove Coupon
router
    .route("/remove-coupon")
    .delete(removeCoupon);

// Remove Item
router
    .route("/item/:itemId")
    .delete(removeCartItem);

// Clear Cart
router
    .route("/clear")
    .delete(clearCart);

module.exports = router;