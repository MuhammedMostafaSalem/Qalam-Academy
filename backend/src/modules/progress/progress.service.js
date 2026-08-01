const { StatusCodes } = require("http-status-codes");
const Progress = require("./progress.model");
const Lesson = require("../lesson/lesson.model");
const Enrollment = require("../enrollment/enrollment.model");
const ApiError = require("../../utils/ApiError");

// Update Lesson Progress
exports.updateLessonProgress = async ({
    userId,
    lessonId,
    watchedSeconds,
    lastPosition,
    completed,
}) => {
    // Get lesson
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
        throw new ApiError(
            "Lesson not found",
            StatusCodes.NOT_FOUND
        );
    }

    // Check enrollment
    const enrollment = await Enrollment.findOne({
        user: userId,
        course: lesson.course,
    });

    if (!enrollment) {
        throw new ApiError(
            "You are not enrolled in this course",
            StatusCodes.FORBIDDEN
        );
    }

    // Create / Update Progress
    const progress = await Progress.findOneAndUpdate(
        {
            user: userId,
            lesson: lessonId,
        },
        {
            user: userId,
            course: lesson.course,
            lesson: lessonId,
            watchedSeconds,
            lastPosition,
            completed,
            completedAt: completed
                ? progress?.completedAt || new Date()
                : null,
            lastWatchedAt: new Date(),
        },
        {
            upsert: true,
            new: true,
            runValidators: true,
        }
    );

    // Update enrollment progress
    await exports.calculateCourseProgress(
        userId,
        lesson.course
    );

    return progress;
};

// Calculate Course Progress
exports.calculateCourseProgress = async (
    userId,
    courseId
) => {
    const totalLessons = await Lesson.countDocuments({
        course: courseId,
        isPublished: true,
    });

    const completedLessons = await Progress.countDocuments({
        user: userId,
        course: courseId,
        completed: true,
    });

    const percentage =
        totalLessons === 0
            ? 0
            : Math.round(
                (completedLessons / totalLessons) * 100
            );

    const enrollment = await Enrollment.findOne({
        user: userId,
        course: courseId,
    });

    if (!enrollment) return null;

    enrollment.progress = percentage;
    enrollment.isCompleted = percentage === 100;

    await enrollment.save();

    return enrollment;
};

// Get Course Progress
exports.getCourseProgress = async (
    userId,
    courseId
) => {
    const enrollment = await Enrollment.findOne({
        user: userId,
        course: courseId,
    });

    if (!enrollment) {
        throw new ApiError(
            "Enrollment not found",
            StatusCodes.NOT_FOUND
        );
    }

    const lessons = await Progress.find({
        user: userId,
        course: courseId,
    }).sort("createdAt");

    return {
        progress: enrollment.progress,
        isCompleted: enrollment.isCompleted,
        lessons,
    };
};

// Get Continue Watching
exports.getContinueWatching = async (
    userId
) => {
    return await Progress.find({
        user: userId,
    })
        .populate({
            path: "lesson",
            select: "title duration thumbnail course",
        })
        .sort("-lastWatchedAt");
};