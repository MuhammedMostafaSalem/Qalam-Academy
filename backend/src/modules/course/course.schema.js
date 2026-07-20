const { z } = require("zod");

// Base Object
const courseBaseObject = {
    title: z.string({ error: "Course title is required" })
        .trim()
        .min(2, "Course title must be at least 2 characters")
        .max(150, "Course title must not exceed 150 characters"),

    description: z.string({ error: "Course description is required" })
        .trim()
        .min(20, "Description must be at least 20 characters")
        .max(10000, "Description must not exceed 10000 characters"),

    category: z.string()
        .trim()
        .min(1, "Category is required"),

    instructor: z.string()
        .trim()
        .min(1, "Instructor is required"),

    level: z.enum(
        [
            "beginner",
            "intermediate",
            "advanced",
        ],
        {
            errorMap: () => ({
                message: "Invalid course level",
            }),
        }
    ),

    language: z.enum(
        [
            "arabic",
            "english",
        ],
        {
            errorMap: () => ({
                message: "Invalid course language",
            }),
        }
    ),

    price: z.coerce
        .number()
        .min(0, "Price cannot be negative"),

    discountPrice: z.coerce
        .number()
        .min(0, "Discount price cannot be negative")
        .optional(),

    duration: z.coerce
        .number()
        .min(0, "Duration cannot be negative")
        .optional(),

    requirements: z.preprocess(
        // (value) => {
        //     if (!value) return [];

        //     return Array.isArray(value)
        //         ? value
        //         : [value];
        // },
        (value) => {
            if (Array.isArray(value)) return value;

            if (typeof value === "string") {
                return value
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);
            }

            return [];
        },
        z.array(
            z.string()
                .trim()
                .min(1, "Requirements name cannot be empty")
        ).min(1, "At least one requirement is required")
    ),

    objectives: z.preprocess(
        // (value) => {
        //     if (!value) return [];

        //     return Array.isArray(value)
        //         ? value
        //         : [value];
        // },
        // z.array(
        //     z.string().trim().min(1)
        // )
        (value) => {
            if (Array.isArray(value)) return value;

            if (typeof value === "string") {
                return value
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);
            }

            return [];
        },
        z.array(
            z.string()
                .trim()
                .min(1, "Objectives name cannot be empty")
        ).min(1, "At least one objective is required")
    ),

    tags: z.preprocess(
        // (value) => {
        //     if (!value) return [];

        //     return Array.isArray(value)
        //         ? value
        //         : [value];
        // },
        // z.array(
        //     z.string().trim().min(1)
        // )
        (value) => {
            if (Array.isArray(value)) return value;

            if (typeof value === "string") {
                return value
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);
            }

            return [];
        },
        z.array(
            z.string()
                .trim()
                .min(1, "Tags name cannot be empty")
        ).min(1, "At least one tag is required")
    ),
}

const updateFields = {
    ...courseBaseObject,

    isPublished: z.preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }, z.boolean().optional()),

    isFeatured: z.preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }, z.boolean().optional()),
}

// Create
const createCourseSchema = z.object(courseBaseObject)
    .strict()
    .refine(
        (data) =>
            data.discountPrice === undefined ||
            data.discountPrice <= data.price,
        {
            message: "Discount price cannot be greater than price",
            path: ["discountPrice"],
        }
    );

// Update
const updateCourseSchema = z.object(updateFields)
    .partial()
    .strict()
    .refine(
        (data) =>
            data.discountPrice === undefined ||
            data.price === undefined ||
            data.discountPrice <= data.price,
        {
            message: "Discount price cannot be greater than price",
            path: ["discountPrice"],
        }
    );

module.exports = {
    createCourseSchema,
    updateCourseSchema,
};