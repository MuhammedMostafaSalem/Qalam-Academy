const { z } = require("zod");

// Shared fields
const categoryBaseObject = {
    title: z.object({
        ar: z
            .string({ error: "عنوان التصنيف مطلوب" })
            .trim()
            .min(2, "عنوان التصنيف يجب أن يكون على الأقل 2 أحرف")
            .max(100, "عنوان التصنيف يجب ألا يتجاوز 100 حرف"),

        en: z
            .string({ error: "Category title is required" })
            .trim()
            .min(2, "Category title must be at least 2 characters")
            .max(100, "Category title must not exceed 100 characters"),
    }),

    description: z.object({
        ar: z
            .string({ error: "وصف التصنيف مطلوب" })
            .trim()
            .max(1000, "وصف التصنيف يجب ألا يتجاوز 1000 حرف")
            .optional(),

        en: z
            .string({ error: "Category description is required" })
            .trim()
            .max(1000, "Category description must not exceed 1000 characters")
            .optional(),
    }).optional(),

    type: z.enum(
        [
            "portfolio",
            "service",
            "course",
            "blog",
            "product",
        ],
        {
            errorMap: () => ({
                message:
                    "Type must be one of: portfolio, service, course, blog, product",
            }),
        }
    ),

    sortOrder: z
        .coerce
        .number()
        .int("Sort order must be an integer")
        .min(0, "Sort order cannot be negative")
        .optional(),

    // isActive: z
    //     .coerce
    //     .boolean()
    //     .optional(),
    isActive: z.preprocess(
        (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        },
        z.boolean().optional()
    )
}

// Create
const createCategorySchema = z.object(categoryBaseObject);

// Update
const updateCategorySchema = z.object(categoryBaseObject).partial();

module.exports = {
    createCategorySchema,
    updateCategorySchema,
};