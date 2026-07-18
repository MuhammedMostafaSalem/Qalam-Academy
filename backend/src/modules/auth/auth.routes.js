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

const router = express.Router();

// Authentication
router.post(
    "/signup",
    validate(signupSchema),
    signup
);
router.post(
    "/login",
    validate(loginSchema),
    login
);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

// OTP
router.post(
    "/verify-otp",
    validate(verifyOtpSchema),
    verifyAccountOtp
);
router.post(
    "/resend-otp",
    validate(resendOtpSchema),
    resendAccountOtp
);

// Password
router.post(
    "/forgot-password",
    validate(forgetSchema),
    forgotPassword
);
router.patch(
    "/reset-password",
    validate(resetSchema),
    resetPassword
);

module.exports = router;