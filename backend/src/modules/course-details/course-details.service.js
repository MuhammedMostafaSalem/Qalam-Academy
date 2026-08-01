const Course = require("../course/course.model");
const Lesson = require("../lesson/lesson.model");
const Review = require("../review/review.model");
const Enrollment = require("../enrollment/enrollment.model");
const ApiError = require("../../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

// Get Course Details
exports.getCourseDetails = async (slug, userId = null) => {
    // Course
    const course = await Course.findOne({
        slug,
        isPublished: true,
    })
        .populate({
            path: "category",
            select: "title slug",
        })
        .populate({
            path: "instructor",
            select: "firstName lastName avatar bio",
        });

    if (!course) {
        throw new ApiError(
            "Course not found",
            StatusCodes.NOT_FOUND
        );
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

    // Format Lessons
    const formattedLessons = lessons.map((lesson) => ({
        _id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        thumbnail: lesson.thumbnail,
        video: lesson.video,
        duration: lesson.duration,
        sortOrder: lesson.sortOrder,
        isPreview: lesson.isPreview,

        canAccess: enrollment
            ? true
            : lesson.isPreview,

        isCompleted: false,
    }));

    return {
        course,
        reviews,

        isEnrolled: !!enrollment,

        progress: enrollment
            ? enrollment.progress
            : 0,

        lessons: formattedLessons,
    };
};