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
const crypto = require("crypto");

// Registration logic will go here
const signup = catchAsync(async (req, res, next) => {
    // Extract user details from request body
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        country,
        city,
        address,
    } = req.body;

    // add user to database
    const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        password,
        country,
        city,
        address,
    });

    // Generate OTP for email verification
    const otp = await newUser.generateOtp("email_verification");
    await newUser.save();

    // Send verification email with OTP
    await sendEmail({
        email: newUser.email,
        subject: 'Verify your email - Qalam Academy',
        message: `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`,
        html: verifyEmailTemplate(`${newUser.firstName} ${newUser.lastName}`, otp),
    });

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("auth.sentOtp"),
    });
});

// verify account logic will go here
const verifyAccountOtp = catchAsync(async (req, res, next) => {
    // Extract OTP from request body
    const { email, otp, purpose } = req.body;

    // Verify OTP using service layer
    const user = await verifyOtp(email, otp, purpose);

    let message;
    let data;

    if (purpose === "email_verification") {
        message = req.t("auth.verifiedEmail");

        data = {
            name: `${user.firstName} ${user.lastName}`,
        }
    }
    if (purpose === "forgot_password") {
        message = req.t("auth.verifiedPassword");

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        data = {
            resetToken,
        }
    }

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message,
        data,
    });
});

// resend account otp logic will go here
const resendAccountOtp = catchAsync(async (req, res, next) => {
    // Extract email from request body
    const { email, purpose } = req.body;

    // Resend OTP using service layer
    await resendOtp(email, purpose);

    let message;
    if (purpose === "email_verification") {
        message = req.t("auth.resendEmail");
    }
    if (purpose === "forgot_password") {
        message = req.t("auth.resendPassword");
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
        return next(new ApiError(req.t("auth.notFound"), StatusCodes.NOT_FOUND));
    }

    // Check if user is verified
    if (!user.isVerified) {
        return next(new ApiError(req.t("auth.verifyFisrt"), StatusCodes.FORBIDDEN));
    }

    // Compare provided password with stored hashed password
    const isMatch = await user.comparePassword(password);
    // If password does not match, return error
    if (!isMatch) {
        return next(new ApiError(req.t("auth.incorrectPass"), StatusCodes.UNAUTHORIZED));
    }

    // If login is successful, send tokens
    sendToken(user, StatusCodes.OK, res, req)
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
        data: {
            user,
            accessToken: newAccessToken
        },
    });
});

// Forgot password logic here
const forgotPassword = catchAsync(async (req, res, next) => {
    // Extract email from request body
    const { email } = req.body;

    // Resent OTP using service layer
    await resendOtp(email, "forgot_password");

    // Respond to the client
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("auth.sentOtp"),
    });
});

// Reset password logic here
const resetPassword = catchAsync(async (req, res, next) => {
    // Extract email, password and confirm password from request body
    const { token, password, confirmPassword } = req.body;

    // Confirm that the passwords match before anything else
    if (password !== confirmPassword) {
        return next(new ApiError(req.t("auth.notmatchPassword"), StatusCodes.BAD_REQUEST));
    }

    // Hash received token
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find user by email
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }).select("+password");
    console.log(token);
    console.log(hashedToken);
    // If user not found, return error
    if (!user) return next(new ApiError(req.t("auth.invalidResetToken"), StatusCodes.BAD_REQUEST));

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
        message: req.t("auth.successMessage"),
    });
});

// Logout logic here
const logout = catchAsync(async (req, res, next) => {
    // Cookie settings (Security Options)
    const cookieOptions = {
        expires: new Date(Date.now()),
        // maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: env.nodeEnv === "production",
        path: "/",
    }

    // Clear refresh token cookie
    // res.cookie("Qalam_Token", null, cookieOptions);
    res.clearCookie("Qalam_Token", cookieOptions);

    // Send success response
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("auth.logout"),
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