const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const {
    getAdminDashboard,
    getInstructorDashboard,
    getStudentDashboard,
} = require("./dashboard.service");


// Admin Dashboard
exports.getAdminDashboard = catchAsync(async (req, res) => {
    const dashboard = await getAdminDashboard(req.language);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("dashboard.fetched"),
        data: dashboard,
    });
});

// Instructor Dashboard
exports.getInstructorDashboard = catchAsync(async (req, res) => {
    const dashboard = await getInstructorDashboard(
        req.user.id,
        req.language
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("dashboard.fetched"),
        data: dashboard,
    });
});

// Student Dashboard
exports.getStudentDashboard = catchAsync(async (req, res) => {
    const dashboard = await getStudentDashboard(
        req.user.id,
        req.language
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("dashboard.fetched"),
        data: dashboard,
    });
});