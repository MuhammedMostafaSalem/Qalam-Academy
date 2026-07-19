const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const catchAsync = require("./catchAsync");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../modules/users/user.model");

// Middleware for verifying that the user is logged in (authentication)
const isAuthenticatedUser = catchAsync(async (req, res, next) => {
    let token;
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];

    // Check Authorization header
    if (authHeader && authHeader.startsWith("Bearer "))
        token = authHeader.split(" ")[1];

    // If there are no tokens
    if (!token)
        return next(new ApiError("Unauthorized. Please login to access this resource.", StatusCodes.UNAUTHORIZED));

    // Verify token(errors handled by global error middleware)
    const decoded = jwt.verify(token, env.jwtAccessSecret);

    // Get user from database
    const user = await User.findById(decoded.id);

    // If user not found
    if (!user) return next(new ApiError("User not found", StatusCodes.NOT_FOUND));

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
                    `Role (${req.user.role}) is not allowed to access this resource`,
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