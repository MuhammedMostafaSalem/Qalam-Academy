const mongoose = require("mongoose");
const Course = require("../course/course.model");
const Lesson = require("../lesson/lesson.model");
const Review = require("../review/review.model");
const Enrollment = require("../enrollment/enrollment.model");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const translateDocument = require("../../utils/translateDocument");

// Get Course Details
exports.getCourseDetails = async (req, slug, userId = null, language = "ar") => {
    const isId = mongoose.Types.ObjectId.isValid(slug);
    const query = isId ? { $or: [{ slug }, { _id: slug }] } : { slug };

    // Find course by slug or ID
    let course = await Course.findOne(query)
        .populate({
            path: "category",
            select: "title slug name",
        })
        .populate({
            path: "instructor",
            select: "firstName lastName avatar bio email",
        });

    if (!course) {
        throw new ApiError(req.t("course.notFound"), StatusCodes.NOT_FOUND);
    }

    // Lessons
    const lessons = await Lesson.find({
        course: course._id,
        isPublished: true,
    })
        .select(
            "title description thumbnail video duration sortOrder isPreview"
        )
        .sort("sortOrder");

    // Latest Reviews
    const reviews = await Review.find({
        course: course._id,
    })
        .populate({
            path: "user",
            select: "firstName lastName avatar",
        })
        .sort("-createdAt")
        .limit(5);

    // Enrollment
    let enrollment = null;

    if (userId) {
        enrollment = await Enrollment.findOne({
            user: userId,
            course: course._id,
        });
    }

    // Format and translate Lessons
    const formattedLessons = lessons.map((lesson) => {
        const translatedLesson = translateDocument(lesson, language, [
            "title",
            "description",
        ]);

        return {
            _id: translatedLesson._id,
            title: translatedLesson.title,
            description: translatedLesson.description,
            thumbnail: translatedLesson.thumbnail,
            video: translatedLesson.video,
            duration: translatedLesson.duration,
            sortOrder: translatedLesson.sortOrder,
            isPreview: translatedLesson.isPreview,

            canAccess: enrollment
                ? true
                : translatedLesson.isPreview,

            isCompleted: false,
        };
    });

    const translatedCourse = translateDocument(course, language, [
        "title",
        "description",
        "category.title",
    ]);

    return {
        course: translatedCourse,
        reviews,

        isEnrolled: !!enrollment,

        progress: enrollment
            ? enrollment.progress
            : 0,

        lessons: formattedLessons,
    };
};
