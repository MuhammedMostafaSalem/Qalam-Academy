const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../utils/ApiError");
const verifyEmailTemplate = require("../../templates/verifyEmailTemplate");
const forgotPasswordTemplate = require("../../templates/forgotPasswordTemplate");
const sendEmail = require("../../utils/sendEmail");

// Verify OTP
const verifyOtp = async (email, otp, purpose) => {
    // Find a user whose OTP has not expired yet
    const user = await User.findOne({
        email,
        otpPurpose: purpose,
        otpExpires: { $gt: Date.now() },
    }).select("+otp"); // Explicitly include OTP field

    // If no user is found, OTP is invalid or expired
    if (!user) {
        throw new ApiError("Invalid or expired OTP", StatusCodes.BAD_REQUEST);
    }

    // Compare the provided OTP with the hashed OTP stored in database
    const isMatch = await bcrypt.compare(otp, user.otp);

    // If OTP does not match, throw an error
    if (!isMatch) {
        throw new ApiError("Invalid OTP", StatusCodes.BAD_REQUEST);
    }

    // Email verification
    if (purpose === "email_verification") {
        // Prevent verifying an already verified user
        if (user.isVerified) {
            throw new ApiError("User already verified", StatusCodes.BAD_REQUEST);
        }
        // Mark user as verified
        user.isVerified = true;
    }

    // clear OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpResendTimeout = undefined;
    user.otpPurpose = undefined;

    await user.save();

    return user;
}

// Resend OTP
const resendOtp = async (email, purpose) => {
    // Find user by phone number
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
        throw new ApiError("User not found", StatusCodes.NOT_FOUND);
    }

    // If user is already verified, no need to resend OTP
    if (purpose === "email_verification" && user.isVerified) {
        throw new ApiError("User already verified", StatusCodes.BAD_REQUEST);
    }


    // Prevent OTP spam by checking resend timeout
    if (user.otpResendTimeout && user.otpResendTimeout > Date.now()) {
        const secondsLeft = Math.ceil((user.otpResendTimeout - Date.now()) / 1000);
        throw new ApiError(
            `Please wait ${secondsLeft} seconds before requesting a new OTP`,
            StatusCodes.TOO_MANY_REQUESTS
        );
    }

    // Generate new OTP and update resend timeout
    const otp = await user.generateOtp(purpose);
    await user.save();

    // Send OTP via email
    await sendEmail({
        email: user.email,
        subject: purpose === "forgot_password"
            ? "Reset Password OTP - Qalam Academy"
            : "Verify Email OTP - Chato App",
        html: purpose === "forgot_password"
            ? forgotPasswordTemplate(user.username, otp)
            : verifyEmailTemplate(user.username, otp)
    });

    return true;
}

module.exports = {
    verifyOtp,
    resendOtp
}