const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");

const {
    getSettings,
    updateSettings,
} = require("./settings.service");
const handleUploadedFiles = require("../../utils/handleUploadedFiles");


// Get Settings
exports.getSettings = catchAsync(async (req, res) => {
    const settings = await getSettings();

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Settings fetched successfully",
        data: settings,
    });
});


// Update Settings
exports.updateSettings = catchAsync(async (req, res) => {
    handleUploadedFiles({ req, fileFields: ["logoDark", "logoLight", "favicon"] });

    const settings = await updateSettings(
        req.body,
        req.user.id
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Settings updated successfully",
        data: settings,
    });
});