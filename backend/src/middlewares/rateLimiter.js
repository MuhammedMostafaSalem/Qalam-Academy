const rateLimit = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");

// حماية مسار التسجيل من البوتات والهجمات العشوائية
const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 5, // أقصى حد 5 محاولات تسجيل من نفس الـ IP خلال 15 دقيقة
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            // message: "Too many accounts created from this IP, please try again after 15 minutes",
            message: req.t("auth.signupLimiter"),
        });
    },
});

// حماية مسار الـ Login من الـ Brute-force
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 5, // 5 محاولات خطأ
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            message: "Too many login attempts, please try again after 15 minutes",
        });
    },
});

// ==========================================
// OTP verification limiter
// ==========================================
// This is IP-based protection.
// It must be higher than 6 so the user's
// 6th OTP attempt can reach verifyOtp().
const otpActionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 10, // أقصى حد 10 طلبات إرسال إيميل لكل IP
    standardHeaders: true,
    legacyHeaders: false,
    // message: { 
    //     success: false, 
    //     message: "Too many OTP requests from this IP, please try again after 15 minutes" 
    // },
    handler: (req, res, next) => {
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            // message: "Too many accounts created from this IP, please try again after 15 minutes",
            message: req.t("auth.otpActionLimiter"),
        });
    },
});

module.exports = {
    signupLimiter,
    loginLimiter,
    otpActionLimiter
};