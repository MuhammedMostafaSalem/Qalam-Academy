const { StatusCodes } = require("http-status-codes");
const Progress = require("./progress.model");
const Lesson = require("../lesson/lesson.model");
const Enrollment = require("../enrollment/enrollment.model");
const ApiError = require("../../utils/ApiError");
const translateDocument = require("../../utils/translateDocument");

const clampPercentage = (value) => Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

const getLessonAndEnrollment = async ({ req, userId, lessonId }) => {
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
        throw new ApiError(req.t("lesson.notFound"), StatusCodes.NOT_FOUND);
    }

    const enrollment = await Enrollment.findOne({
        user: userId,
        course: lesson.course,
    });

    if (!enrollment) {
        throw new ApiError(req.t("progress.notEnrolledCourse"), StatusCodes.FORBIDDEN);
    }

    return { lesson, enrollment };
};

const upsertPosition = async ({ userId, lesson, watchedSeconds, lastPosition }) => {
    return Progress.findOneAndUpdate(
        {
            user: userId,
            lesson: lesson._id,
        },
        {
            $set: {
                course: lesson.course,
                lastPosition: Math.max(0, lastPosition),
                lastWatchedAt: new Date(),
            },
            $max: {
                watchedSeconds: Math.max(0, watchedSeconds),
            },
            $setOnInsert: {
                user: userId,
                lesson: lesson._id,
                completed: false,
            },
        },
        {
            upsert: true,
            new: true,
            runValidators: true,
        }
    );
};

// Shared, idempotent completion operation used by automatic and manual flows.
exports.completeContent = async ({ userId, lesson, watchedSeconds, lastPosition }) => {
    const existingProgress = await Progress.findOne({
        user: userId,
        lesson: lesson._id,
    }).select("completed completedAt");

    const setFields = {
        course: lesson.course,
        completed: true,
        lastPosition: Math.max(0, lastPosition),
        lastWatchedAt: new Date(),
    };

    if (!existingProgress?.completedAt) {
        setFields.completedAt = new Date();
    }

    return Progress.findOneAndUpdate(
        {
            user: userId,
            lesson: lesson._id,
        },
        {
            $set: setFields,
            $max: {
                watchedSeconds: Math.max(0, watchedSeconds),
            },
            $setOnInsert: {
                user: userId,
                lesson: lesson._id,
            },
        },
        {
            upsert: true,
            new: true,
            runValidators: true,
        }
    );
};

// Update Lesson Progress
exports.updateLessonProgress = async ({
    req,
    userId,
    lessonId,
    watchedSeconds,
    lastPosition,
    completed,
}) => {
    const { lesson } = await getLessonAndEnrollment({ req, userId, lessonId });

    // A normal position update never clears an existing completion. Both the
    // 90% flow and the manual button enter through the same completion method.
    const lessonProgress = completed
        ? await exports.completeContent({
            userId,
            lesson,
            watchedSeconds,
            lastPosition,
        })
        : await upsertPosition({
            userId,
            lesson,
            watchedSeconds,
            lastPosition,
        });

    const courseProgress = await exports.calculateCourseProgress(
        userId,
        lesson.course
    );

    return {
        lesson: lessonProgress,
        courseProgress,
    };
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

    const completedLessonIds = await Progress.distinct("lesson", {
        user: userId,
        course: courseId,
        completed: true,
    });

    const completedLessons = completedLessonIds.length === 0
        ? 0
        : await Lesson.countDocuments({
            _id: { $in: completedLessonIds },
            course: courseId,
            isPublished: true,
        });

    const percentage = clampPercentage(
        totalLessons === 0
            ? 0
            : Math.round(
                (completedLessons / totalLessons) * 100
            )
    );

    const enrollment = await Enrollment.findOne({
        user: userId,
        course: courseId,
    });

    if (!enrollment) return null;

    enrollment.progress = percentage;
    enrollment.isCompleted = totalLessons > 0 && completedLessons === totalLessons;

    await enrollment.save();

    return {
        progress: percentage,
        progressPercent: percentage,
        isCompleted: enrollment.isCompleted,
        completedLessons,
        totalLessons,
    };
};

// Get Course Progress
exports.getCourseProgress = async (
    req,
    userId,
    courseId
) => {
    const enrollment = await Enrollment.findOne({
        user: userId,
        course: courseId,
    });

    if (!enrollment) {
        throw new ApiError(req.t("enrollment.notFound"), StatusCodes.NOT_FOUND);
    }

    const courseProgress = await exports.calculateCourseProgress(userId, courseId);

    const [lessons, progressItems] = await Promise.all([
        Lesson.find({
            course: courseId,
            isPublished: true,
        }).sort("sortOrder"),
        Progress.find({
            user: userId,
            course: courseId,
        }),
    ]);

    const progressByLesson = new Map(
        progressItems.map((item) => [String(item.lesson), item])
    );

    const formattedLessons = lessons.map((lesson) => {
        const translatedLesson = translateDocument(lesson, req.language, [
            "title",
            "description",
        ]);
        const itemProgress = progressByLesson.get(String(lesson._id));

        return {
            ...translatedLesson,
            isCompleted: Boolean(itemProgress?.completed),
            watchedSeconds: itemProgress?.watchedSeconds || 0,
            lastPosition: itemProgress?.lastPosition || 0,
            completedAt: itemProgress?.completedAt || null,
        };
    });

    return {
        ...courseProgress,
        lessons: formattedLessons,
    };
};

// Get Continue Watching
exports.getContinueWatching = async (
    userId,
    language = "ar"
) => {
    const list = await Progress.find({
        user: userId,
    })
        .populate({
            path: "course",
            select: "title slug thumbnail",
        })
        .populate({
            path: "lesson",
            select: "title duration thumbnail",
        })
        .sort("-lastWatchedAt");

    const courseIds = [
        ...new Set(list.map((item) => String(item.course?._id || item.course)).filter(Boolean)),
    ];
    const enrollments = courseIds.length
        ? await Enrollment.find({
            user: userId,
            course: { $in: courseIds },
        }).select("course progress")
        : [];
    const enrollmentByCourse = new Map(
        enrollments.map((item) => [String(item.course?._id || item.course), item])
    );
    const seenCourses = new Set();

    return list.reduce((result, item) => {
        if (!item.course || !item.lesson) return result;

        const courseId = String(item.course._id || item.course);
        if (seenCourses.has(courseId)) return result;
        seenCourses.add(courseId);

        result.push({
            _id: courseId,
            course: translateDocument(item.course, language, ["title"]),
            progress: enrollmentByCourse.get(courseId)?.progress || 0,
            lastLesson: translateDocument(item.lesson, language, ["title"]),
            lastPosition: item.lastPosition || 0,
            watchedSeconds: item.watchedSeconds || 0,
            lastWatchedAt: item.lastWatchedAt,
        });

        return result;
    }, []);
};
