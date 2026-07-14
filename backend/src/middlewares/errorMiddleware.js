const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const sendResponse = require("../utils/sendResponse");
const env = require("../config/env");

const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || "Internal Server Error";

    // Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = StatusCodes.CONFLICT;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} "${err.keyValue[field]}" already exists.`;

        err = new ApiError(message, statusCode);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = StatusCodes.BAD_REQUEST;
        const messages = Object.values(err.errors).map(item => item.message);
        message = messages.join(", ");

        err = new ApiError(message, statusCode);
    }

    // Mongoose Cast error
    if (err.name === "CastError") {
        statusCode = StatusCodes.BAD_REQUEST;
        message = `Invalid ${err.path}: ${err.value}`;

        err = new ApiError(message, statusCode);
    }

    // JWT Error
    if (err.name === "JsonWebTokenError") {
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Invalid token. Please login again.";

        err = new ApiError(message, statusCode);
    }

    // JWT Expired
    if (err.name === "TokenExpiredError") {
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Token expired. Please login again.";

        err = new ApiError(message, statusCode);
    }

    // Multer Error
    if (err.name === "MulterError") {
        statusCode = StatusCodes.BAD_REQUEST;

        err = new ApiError(err.message, statusCode);
    }

    // Development
    if (env.nodeEnv === "development") {
        return sendResponse(res, {
            success: false,
            statusCode: err.statusCode || statusCode,
            message: err.message,
            data: null,
            meta: {
                stack: err.stack,
                error: err,
            },
        });
    }

    // Production
    return sendResponse(res, {
        success: false,
        statusCode: err.statusCode || statusCode,
        message: err.message,
    });

};

module.exports = errorMiddleware;