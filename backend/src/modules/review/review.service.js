const { StatusCodes } = require("http-status-codes");
const Review = require("./review.model");
const Course = require("../course/course.model");
const Enrollment = require("../enrollment/enrollment.model");
const ApiError = require("../../utils/ApiError");


// Check Review Permission
exports.checkReviewPermission = async (userId, courseId) => {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(
            "Course not found",
            StatusCodes.NOT_FOUND
        );
    }

    const enrollment = await Enrollment.findOne({
        user: userId,
        course: courseId,
    });

    if (!enrollment) {
        throw new ApiError(
            "You must enroll in this course before leaving a review",
            StatusCodes.FORBIDDEN
        );
    }

    const review = await Review.findOne({
        user: userId,
        course: courseId,
    });

    if (review) {
        throw new ApiError(
            "You have already reviewed this course",
            StatusCodes.CONFLICT
        );
    }

    return true;
}

// Calculate Course Ratings
exports.calculateCourseRatings = async (courseId) => {
    const stats = await Review.aggregate([
        {
            $match: {
                course: courseId,
            },
        },
        {
            $group: {
                _id: "$course",
                totalReviews: {
                    $sum: 1,
                },
                averageRating: {
                    $avg: "$rating",
                },
            },
        },
    ]);

    if (stats.length === 0) {

        await Course.findByIdAndUpdate(courseId, {
            totalReviews: 0,
            averageRating: 0,
        });

        return;
    }

    await Course.findByIdAndUpdate(courseId, {
        totalReviews: stats[0].totalReviews,
        averageRating: Number(
            stats[0].averageRating.toFixed(1)
        ),
    });
}