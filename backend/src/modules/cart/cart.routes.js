const express = require('express');
const {
    addProductToCart,
    getLoggedUserCart,
    removeCartProduct,
    clearLoggedUserCart,
    updateCartProductCount,
    applyCouponToCart,
    removeCoupon,
} = require('./cart.controller');

const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../../middlewares/auth'); // أو الـ middleware بتاع الـ Auth حسب مسارك

const router = express.Router();

// جميع مسارات الـ Cart تتطلب تسجيل الدخول وبصلاحية 'student'
router.use(isAuthenticatedUser, authorizeRoles('student'));

router
    .route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart)
    .delete(clearLoggedUserCart);

router.patch('/apply-coupon', applyCouponToCart);

router.delete('/remove-coupon', removeCoupon);

router
    .route('/:itemId')
    .put(updateCartProductCount)
    .delete(removeCartProduct)

module.exports = router;