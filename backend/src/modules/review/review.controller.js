const Review = require("./review.model");
const factory = require("../../utils/crudFactory");
const {
    checkReviewPermission,
    calculateCourseRatings,
} = require("./review.service");

// Create Review
exports.createReview = async (req, res, next) => {
    await checkReviewPermission(
        req,
        req.user.id,
        req.body.course
    );

    req.body.user = req.user.id;

    return factory.createOne(Review, {
        modelName: "review",
        afterCreate: async ({ document }) => {
            await calculateCourseRatings(document.course);
        },
    })(req, res, next);
}

// Update Review
exports.updateReview = factory.updateOne(Review, {
    modelName: "review",
    afterUpdate: async ({ document }) => {
        await calculateCourseRatings(document.course);
    }
});

// Delete Review
exports.deleteReview = factory.deleteOne(Review, {
    modelName: "review",
    afterDelete: async ({ document }) => {
        await calculateCourseRatings(document.course);
    }
});

// Get Review
exports.getReview = factory.getOne(Review, {
    modelName: "Review",
    translatableFields: [
        "course.title",
    ],
    populate: [
        {
            path: "user",
            select: "firstName lastName slug avatar email",
        },
        {
            path: "course",
            select: "title slug thumbnail",
        },
    ]
});

// Get Reviews
exports.getReviews = factory.getAll(Review, {
    modelName: "Review",
    translatableFields: [
        "course.title",
    ],
    populate: [
        {
            path: "user",
            select: "firstName lastName slug avatar email",
        },
        {
            path: "course",
            select: "title slug thumbnail",
        },
    ]
});