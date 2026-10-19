const { z } = require("zod");

const lessonBaseObject = {
    course: z.string().trim().min(1, "Course is required"),

    title: z.object({
        ar: z
            .string({ error: "عنوان الدرس مطلوب" })
            .trim()
            .min(2, "عنوان الدرس يجب أن يكون على الأقل 2 أحرف")
            .max(150, "عنوان الدرس يجب ألا يتجاوز 150 حرف"),
        en: z
            .string({ error: "Lesson title is required" })
            .trim()
            .min(2, "Lesson title must be at least 2 characters")
            .max(150, "Lesson title must not exceed 150 characters"),
    }),

    description: z
        .object({
            ar: z
                .string({ error: "وصف الدرس مطلوب" })
                .trim()
                .max(5000, "وصف الدرس يجب ألا يتجاوز 5000 حرف"),
            en: z
                .string({ error: "Lesson description is required" })
                .trim()
                .max(5000, "Description must not exceed 5000 characters"),
        })
        .optional(),

    contentType: z.enum(["video", "text"]).optional(),

    content: z
        .object({
            ar: z.string().max(50000, "المحتوى النصي طويل جدًا"),
            en: z.string().max(50000, "Text content is too long"),
        })
        .optional(),

    learningPoints: z
        .array(
            z.object({
                ar: z
                    .string()
                    .trim()
                    .min(1, "نقطة التعلم بالعربية مطلوبة")
                    .max(500, "نقطة التعلم طويلة جدًا"),

                en: z
                    .string()
                    .trim()
                    .min(1, "Learning point in English is required")
                    .max(500, "Learning point is too long"),
            }),
        )
        .max(20, "لا يمكن إضافة أكثر من 20 نقطة تعلم")
        .optional(),

    duration: z.coerce.number().min(0, "Duration cannot be negative").optional(),

    videoYoutube: z
        .string()
        .trim()
        .url("Must be a valid URL")
        .optional()
        .nullable(),
};

const updateFields = {
    ...lessonBaseObject,

    clearLearningPoints: z.preprocess(
        (value) => value === true || value === "true",
        z.boolean()
    ).optional(),

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

const createLessonSchema = z.object(lessonBaseObject);

const updateLessonSchema = z.object(updateFields).partial();

module.exports = {
    createLessonSchema,
    updateLessonSchema,
};