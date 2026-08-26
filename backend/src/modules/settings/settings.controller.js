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
        message: req.t("settings.fetched"),
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
        message: req.t("settings.updated"),
        data: settings,
    });
});

// Get Theme
exports.getTheme = catchAsync(async (req, res) => {
    const settings = await getSettings();

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t('settings.themeFetched'),
        data: settings.theme,
    });
});


// Update Theme
exports.updateTheme = catchAsync(async (req, res) => {
    const settings = await updateSettings(
        {
            theme: req.body.theme,
        },
        req.user._id
    );

    return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: req.t("settings.themeUpdated"),
        data: settings.theme,
    });
});