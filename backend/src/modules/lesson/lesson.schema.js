const { z } = require("zod");

// Base Object
const lessonBaseObject = {
    course: z
        .string()
        .trim()
        .min(1, "Course is required"),

    title: z
        .string({ error: "Lesson title is required" })
        .trim()
        .min(2, "Lesson title must be at least 2 characters")
        .max(150, "Lesson title must not exceed 150 characters"),

    description: z
        .string({ error: "Lesson description is required" })
        .trim()
        .max(5000, "Description must not exceed 5000 characters")
        .optional(),

    duration: z.coerce
        .number()
        .min(0, "Duration cannot be negative")
        .optional(),
}

// Fields allowed only in Update
const updateFields = {
    ...lessonBaseObject,

    sortOrder: z.coerce
        .number()
        .min(1, "Sort order must be at least 1")
        .optional(),

    isPublished: z.preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }, z.boolean().optional()),

    isPreview: z.preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }, z.boolean().optional()),
};

// Create
const createLessonSchema = z
    .object(lessonBaseObject)
    .strict();

// Update
const updateLessonSchema = z
    .object(updateFields)
    .partial()
    .strict();

module.exports = {
    createLessonSchema,
    updateLessonSchema,
};