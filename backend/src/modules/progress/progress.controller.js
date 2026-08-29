const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../middlewares/catchAsync");
const sendResponse = require("../../utils/sendResponse");
const {
    updateLessonProgress,
    getCourseProgress,
    getContinueWatching,
} = require("./progress.service");

/*
    * Update Lesson Progress
    * POST /api/progress
*/
exports.updateProgress = catchAsync(async (req, res) => {
    const progress = await updateLessonProgress({
        req,
        userId: req.user.id,
        lessonId: req.body.lesson,
        watchedSeconds: req.body.watchedSeconds,
        lastPosition: req.body.lastPosition,
        completed: req.body.completed,
    });

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("progress.updated"),
        data: progress,
    });
});

/*
    * Get Course Progress
    * GET /api/progress/:courseId
*/
exports.getProgress = catchAsync(async (req, res) => {
    const progress = await getCourseProgress(
        req,
        req.user.id,
        req.params.courseId
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("progress.fetched"),
        data: progress,
    });
});

/*
    * Continue Watching
    * GET /api/progress/continue-watching
*/
exports.getContinueWatchingList = catchAsync(async (req, res) => {
    const lessons = await getContinueWatching(req.user.id, req.language);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: req.t("progress.continueWatchingFetched"),
        data: lessons,
    });
});