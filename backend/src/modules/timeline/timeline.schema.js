const { z } = require("zod");

// Shared Fields
const timelineBaseObject = {
    year: z.coerce
        .number({
            required_error: "Year is required",
        })
        .int("Year must be an integer")
        .min(1900, "Year must be greater than 1900")
        .max(3000, "Year must be less than 3000"),

    title: z.object({
        ar: z
            .string({
                required_error: "عنوان المرحلة مطلوب",
            })
            .trim()
            .min(2, "عنوان المرحلة يجب أن يكون على الأقل حرفين")
            .max(200, "عنوان المرحلة يجب ألا يتجاوز 200 حرف"),

        en: z
            .string({
                required_error: "Timeline title is required",
            })
            .trim()
            .min(2, "Timeline title must be at least 2 characters")
            .max(200, "Timeline title must not exceed 200 characters"),
    }),

    sortOrder: z.coerce
        .number()
        .int("Sort order must be an integer")
        .min(0, "Sort order cannot be negative")
        .optional(),

    isActive: z.preprocess(
        (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        },
        z.boolean().optional()
    ),
};

// Create
const createTimelineSchema = z
    .object(timelineBaseObject);

// Update
const updateTimelineSchema = z
    .object(timelineBaseObject)
    .partial();

module.exports = {
    createTimelineSchema,
    updateTimelineSchema,
};