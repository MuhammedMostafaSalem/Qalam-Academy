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

const router = express.Router();

// Authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

// OTP
router.post("/verify-otp", verifyAccountOtp);
router.post("/resend-otp", resendAccountOtp);

// Password
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

module.exports = router;