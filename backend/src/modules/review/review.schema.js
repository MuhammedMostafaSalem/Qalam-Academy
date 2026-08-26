const { z } = require("zod");

// Create Review
const createReviewSchema = z.object({
    course: z
        .string({
            required_error: "Course ID is required"
        })
        .trim(),

    rating: z
        .number({
            required_error: "Rating is required",
            invalid_type_error: "Rating must be a number",
        })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),

    comment: z
        .string()
        .trim()
        .min(3, "Comment must be at least 3 characters")
        .max(1000, "Comment cannot exceed 1000 characters"),
});


// Update Review
const updateReviewSchema = z.object({
    rating: z
        .number({
            invalid_type_error: "Rating must be a number",
        })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .optional(),

    comment: z
        .string()
        .trim()
        .min(3, "Comment must be at least 3 characters")
        .max(1000, "Comment cannot exceed 1000 characters")
        .optional(),
})
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "Please provide at least one field to update",
        }
    );

module.exports = {
    createReviewSchema,
    updateReviewSchema,
};