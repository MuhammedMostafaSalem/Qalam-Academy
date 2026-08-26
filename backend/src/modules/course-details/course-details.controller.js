const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const { StatusCodes } = require("http-status-codes");

const {
    getCourseDetails,
} = require("./course-details.service");

// Get Course Details
exports.getCourseDetails = catchAsync(async (req, res) => {
    const data = await getCourseDetails(
        req,
        req.params.slug,
        req.user?.id || null
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("courseDetails.fetched"),
        data,
    });
});