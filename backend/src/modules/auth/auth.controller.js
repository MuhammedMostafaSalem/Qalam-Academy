const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../middlewares/catchAsync");
const verifyEmailTemplate = require("../../templates/verifyEmailTemplate");
const sendEmail = require("../../utils/sendEmail");
const sendResponse = require("../../utils/sendResponse");
const User = require("../users/user.model");
const ApiError = require("../../utils/ApiError");
const { verifyOtp, resendOtp } = require("./otp.service");
const sendToken = require("../../utils/sendToken");
const env = require("../../config/env");

// Registration logic will go here
const signup = catchAsync(async (req, res, next) => {
    // Extract user details from request body
    const { username, email, phone, password } = req.body;

    // add user to database
    const newUser = new User({
        username,
        email,
        phone,
        password,
    });

    // Generate OTP for email verification
    const otp = await newUser.generateOtp("email_verification");
    await newUser.save();

    // Send verification email with OTP
    await sendEmail({
        email: newUser.email,
        subject: 'Verify your email - Qalam Academy',
        message: `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`,
        html: verifyEmailTemplate(newUser.username, otp),
    });

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "otp sent to your email for verification",
    });
});

// verify account logic will go here
const verifyAccountOtp = catchAsync(async (req, res, next) => {
    // Extract OTP from request body
    const { email, otp, purpose } = req.body;

    // Validate email and OTP
    if (!email) return next(new ApiError("Email  is required", StatusCodes.BAD_REQUEST));
    if (!otp) return next(new ApiError("OTP is required", StatusCodes.BAD_REQUEST));

    // Verify OTP using service layer
    const user = await verifyOtp(email, otp, purpose);

    let message;
    if (purpose === "email_verification") {
        message = "User verified successfully";
    }
    if (purpose === "forgot_password") {
        message = "OTP verified, you can reset your password now";
    }

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message,
        data: user.username,
    });
});

// resend account otp logic will go here
const resendAccountOtp = catchAsync(async (req, res, next) => {
    // Extract email from request body
    const { email, purpose } = req.body;

    // Validate email input
    if (!email) {
        return next(new ApiError("email is required", StatusCodes.BAD_REQUEST));
    }

    // Resend OTP using service layer
    await resendOtp(email, purpose);

    let message;
    if (purpose === "email_verification") {
        message = "Verification OTP resent successfully";
    }
    if (purpose === "forgot_password") {
        message = "Password reset OTP resent successfully";
    }

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message,
    });
});

// Loging logic will go here
const login = catchAsync(async (req, res, next) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email and include password field
    const user = await User.findOne({ email }).select("+password")

    // If user not found, return error
    if (!user) {
        return next(new ApiError("User not found", StatusCodes.UNAUTHORIZED));
    }

    // Check if user is verified
    if (!user.isVerified) {
        return next(new ApiError("Please verify your account first", StatusCodes.FORBIDDEN));
    }

    // Compare provided password with stored hashed password
    const isMatch = await user.comparePassword(password);
    // If password does not match, return error
    if (!isMatch) {
        return next(new ApiError("Password is incorrect", StatusCodes.UNAUTHORIZED));
    }

    // If login is successful, send tokens
    sendToken(user, StatusCodes.OK, res)
});

// Refresh token logic here
const refreshToken = catchAsync(async (req, res, next) => {
    // Get refresh token from cookies
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new ApiError("Please login again", StatusCodes.UNAUTHORIZED));
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);

    // Find user and check if refresh token matches
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }

    // Generate new access token
    const newAccessToken = user.generateAccessToken();

    // Send new access token
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        data: { accessToken: newAccessToken },
    });
});

// Forgot password logic here
const forgotPassword = catchAsync(async (req, res, next) => {
    // Extract phoneNumber from request body
    const { email } = req.body;

    // Resent OTP using service layer
    await resendOtp(email, "forgot_password");

    // Respond to the client
    res.success('OTP sent to your email for reset password', 200);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "OTP sent to your email for reset password",
    });
});

// Reset password logic here
const resetPassword = catchAsync(async (req, res, next) => {
    // Extract phoneNumber, password and confirm password from request body
    const { email, password } = req.body;

    // Find user by phoneNumber
    const user = await User.findOne({ email }).select("+password");

    // If user not found, return error
    if (!user) return next(new ApiError("User not found", StatusCodes.NOT_FOUND));

    // Update password
    user.password = password;

    // clear OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpResendTimeout = undefined;
    user.otpPurpose = undefined;

    await user.save();

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Reset password successfully.",
    });
});

// Logout logic here
const logout = catchAsync(async (req, res, next) => {
    // Cookie settings (Security Options)
    const cookieOptions = {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "strict",
        expires: new Date(0),
    }

    // Clear refresh token cookie
    res.clearCookie("refreshToken", cookieOptions);

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Logged out successfully",
    });
});

module.exports = {
    signup,
    verifyAccountOtp,
    resendAccountOtp,
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
    logout,
}