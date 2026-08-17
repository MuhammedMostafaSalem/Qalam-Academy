const express = require('express');
const {
    createCashOrder,
    createPaymobCheckoutSession,
    paymobWebhook,
    getAllOrders,
    getSpecificOrder,
    filterOrdersForLoggedUser,
    createPayPalCheckoutSession,
    verifyPayPalPayment,
    cancelOrder,
} = require('./orders.controller');
const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../../middlewares/auth');

const router = express.Router();

// Webhook الخاص بـ Paymob (يجب أن يكون عاماً بدون حماية لأن Paymob هي التي ستستدعيه)
router.post('/webhook/paymob', paymobWebhook);

// جميع المسارات التالية تتطلب تسجيل الدخول
router.use(isAuthenticatedUser);

// 1) إنشاء طلب كاش
router.route('/:cartId').post(authorizeRoles("student"), createCashOrder);

// 2) إنشاء جلسة دفع Paymob (card, wallet, fawry)
router.route('/checkout-paymob/:cartId').post(authorizeRoles("student"), createPaymobCheckoutSession);

// 3) جلب جميع الطلبات (لليوزر العادي عروض طلباته فقط، وللأدمن كل الطلبات)
router.route('/').get(authorizeRoles("student", "instructor", "admin"), filterOrdersForLoggedUser, getAllOrders);

// 4) جلب طلب معين بالـ ID
router.route('/:id').get(authorizeRoles("student", "instructor", "admin"), getSpecificOrder);

// مسار إنشاء جلسة دفع باي بال
router.route('/checkout-paypal/:cartId').post(authorizeRoles("student"), createPayPalCheckoutSession);

// مسار تأكيد الدفع بعد عودة المستخدم من باي بال
router.route('/paypal/success').post(authorizeRoles("student"), verifyPayPalPayment);

router.route('/:id/cancel').patch(authorizeRoles("student"), cancelOrder);

module.exports = router;