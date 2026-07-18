const sendResponse = (
    res,
    {
        statusCode = 200,
        success = true,
        message = "",
        data,
        meta,
        errors
    }
) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        meta,
        errors
    });
};

module.exports = sendResponse;