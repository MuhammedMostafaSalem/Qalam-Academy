const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const catchAsync = require("./catchAsync");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../modules/users/user.model");

// Middleware for verifying that the user is logged in (authentication)
const isAuthenticatedUser = catchAsync(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // // Check Authorization header
    // if (authHeader && authHeader.startsWith("Bearer "))
    //     token = authHeader.split(" ")[1];

    // 1. Try Cookie first
    if (req.cookies?.Qalam_Token) {
        token = req.cookies.Qalam_Token;
    }

    // 2. Fallback to Authorization header
    if (!token) {
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    // If there are no tokens
    if (!token)
        return next(new ApiError(req.t("auth.PleaseLoginToAccess"), StatusCodes.UNAUTHORIZED));

    // Verify token(errors handled by global error middleware)
    const decoded = jwt.verify(token, env.jwtSecretToken);

    // Get user from database
    const user = await User.findById(decoded.id);

    // If user not found
    if (!user) return next(new ApiError(req.t("auth.notFound"), StatusCodes.NOT_FOUND));

    // If user active === false 
    if (!user.isActive) {
        return next(new ApiError(req.t("user.administratorDeactivatedAccount"),StatusCodes.FORBIDDEN));
    }

    // Attach user to request
    req.user = user;

    next();
});

// Authorization middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check whether the current user's role is among the permitted roles.
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    // `Role (${req.user.role}) is not allowed to access this resource`,
                    req.t("auth.roleNotAllowed", {
                        role: req.user.role,
                    }),
                    StatusCodes.FORBIDDEN
                )
            );
        }

        next();
    }
}

module.exports = {
    isAuthenticatedUser,
    authorizeRoles
}