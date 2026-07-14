const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const notFound = (req, res, next) => {
    next(new ApiError(`Route ${req.originalUrl} not found`, StatusCodes.NOT_FOUND));
};

module.exports = notFound;