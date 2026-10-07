const express = require("express");
const {
    signup,
    login,
    logout,
    refreshToken,
    verifyAccountOtp,
    resendAccountOtp,
    forgotPassword,
    resetPassword
} = require("./auth.controller");
const validate = require("../../middlewares/validate");
const signupSchema = require("./validators/signup.schema");
const verifyOtpSchema = require("./validators/verifyOtp.schema");
const resendOtpSchema = require("./validators/resendOtp.schema");
const loginSchema = require("./validators/login.schema");
const forgetSchema = require("./validators/forgetPass.schema");
const resetSchema = require("./validators/resetPass.schema");
const { signupLimiter, loginLimiter, otpActionLimiter } = require("../../middlewares/rateLimiter");

const router = express.Router();

// Authentication
router.post(
    "/signup",
    signupLimiter, // حماية الـ Spam Bots أولاً
    validate(signupSchema),
    signup
);
router.post(
    "/login",
    loginLimiter, // حماية الـ Login ضد الـ Brute-force
    validate(loginSchema),
    login
);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

// OTP
router.post(
    "/verify-otp",
    otpActionLimiter, // حماية محاولات التحقق
    validate(verifyOtpSchema),
    verifyAccountOtp
);
router.post(
    "/resend-otp",
    otpActionLimiter, // حماية طلبات إعادة الإرسال من الـ Spam
    validate(resendOtpSchema),
    resendAccountOtp
);

// Password
router.post(
    "/forgot-password",
    otpActionLimiter, // حماية طلبات استعادة الكلمة من الإغراق
    validate(forgetSchema),
    forgotPassword
);
router.patch(
    "/reset-password",
    validate(resetSchema),
    resetPassword
);

module.exports = router;