const { z } = require("zod");

// Update Lesson Progress
const updateProgressSchema = z.object({
    lesson: z
        .string({
            required_error: "Lesson ID is required",
        })
        .trim()
        .min(1, "Lesson ID is required"),

    watchedSeconds: z
        .number({
            required_error: "Watched seconds is required",
            invalid_type_error: "Watched seconds must be a number",
        })
        .min(0, "Watched seconds cannot be negative"),

    lastPosition: z
        .number({
            required_error: "Last position is required",
            invalid_type_error: "Last position must be a number",
        })
        .min(0, "Last position cannot be negative"),

    completed: z
        .boolean({
            required_error: "Completed is required",
            invalid_type_error: "Completed must be true or false",
        }),
}).strict();

module.exports = {
    updateProgressSchema,
};