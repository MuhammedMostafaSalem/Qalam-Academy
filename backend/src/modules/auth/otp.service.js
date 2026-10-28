const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../utils/ApiError");
const verifyEmailTemplate = require("../../templates/verifyEmailTemplate");
const forgotPasswordTemplate = require("../../templates/forgotPasswordTemplate");
const sendEmail = require("../../utils/sendEmail");
const {
    maxAttempts
} = require("../../config/env");

// Verify OTP
const verifyOtp = async (req, email, otp, purpose) => {
    const user = await User.findOne({
        email,
        otpPurpose: purpose,
        otpExpires: { $gt: Date.now() },
    }).select("+otp +otpAttempts");

    // OTP غير موجود أو منتهي
    if (!user) {
        throw new ApiError(req.t("auth.invalidOTP"), StatusCodes.BAD_REQUEST);
    }

    // الحساب موقوف
    if (!user.isActive) {
        throw new ApiError(
            req.t("auth.accountSuspended"),
            StatusCodes.FORBIDDEN
        );
    }

    const MAX_ATTEMPTS = maxAttempts;

    // مقارنة OTP
    const isMatch = await bcrypt.compare(otp, user.otp);

    // OTP غلط
    if (!isMatch) {
        user.otpAttempts += 1;

        /*
         * المحاولات:
         *
         * 1 -> remaining 4
         * 2 -> remaining 3
         * 3 -> remaining 2
         * 4 -> remaining 1
         * 5 -> remaining 0
         * 6 -> Suspend account
         */
        // وصل للحد الأقصى
        if (user.otpAttempts > MAX_ATTEMPTS) {
            user.isActive = false;

            // Destroy OTP completely
            user.otp = undefined;
            user.otpExpires = undefined;
            user.otpResendTimeout = undefined;
            user.otpPurpose = undefined;
            // user.otpAttempts = 0;

            await user.save();

            throw new ApiError(req.t("auth.tooManyAttempts"), StatusCodes.FORBIDDEN);
        }

        await user.save();

        const remainingAttempts = MAX_ATTEMPTS - user.otpAttempts;

        throw new ApiError(
            req.t("auth.remainingAttempts", {
                remainingAttempts,
            }),
            StatusCodes.BAD_REQUEST,
        );
    }

    // Email verification
    if (purpose === "email_verification") {
        if (user.isVerified) {
            throw new ApiError(req.t("auth.verifiedUser"), StatusCodes.BAD_REQUEST);
        }

        user.isVerified = true;
        user.isActive = true;
    }

    // Clear OTP data
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpResendTimeout = undefined;
    user.otpPurpose = undefined;
    user.otpAttempts = 0;

    await user.save();

    return user;
};

// Resend OTP
const resendOtp = async (req, email, purpose) => {
    // Find user by phone number
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
        throw new ApiError(req.t("auth.notFound"), StatusCodes.NOT_FOUND);
    }

    // الحساب محظور وغير مُفعّل
    if (!user.isActive) {
        throw new ApiError(
            req.t("auth.accountSuspended"),
            StatusCodes.FORBIDDEN
        );
    }

    // If user is already verified, no need to resend OTP
    if (purpose === "email_verification" && user.isVerified) {
        throw new ApiError(req.t("auth.verifiedUser"), StatusCodes.BAD_REQUEST);
    }

    // Prevent OTP spam by checking resend timeout
    if (user.otpResendTimeout && user.otpResendTimeout > Date.now()) {
        const secondsLeft = Math.ceil((user.otpResendTimeout - Date.now()) / 1000);
        throw new ApiError(
            req.t("auth.otpResendTimeout", { seconds: secondsLeft }),
            StatusCodes.TOO_MANY_REQUESTS,
        );
    }

    // Generate new OTP and update resend timeout
    const otp = await user.generateOtp(purpose);
    await user.save();

    // Send OTP via email
    await sendEmail({
        email: user.email,
        subject:
            purpose === "forgot_password"
                ? "Reset Password OTP - Qalam Academy"
                : "Verify Email OTP - Qalam Academy",
        message: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        html:
            purpose === "forgot_password"
                ? forgotPasswordTemplate(`${user.firstName} ${user.lastName}`, otp)
                : verifyEmailTemplate(`${user.firstName} ${user.lastName}`, otp),
    });

    return true;
};

module.exports = {
    verifyOtp,
    resendOtp,
};
