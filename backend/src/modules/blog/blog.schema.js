const { z } = require("zod");


// Translation Object
const translationSchema = z.object({
    ar: z
        .string()
        .trim()
        .min(2)
        .max(5000),

    en: z
        .string()
        .trim()
        .min(2)
        .max(5000),
});


// Shared Fields
const blogBaseObject = {
    title: translationSchema,

    excerpt: translationSchema.optional(),

    content: translationSchema,

    seoTitle: translationSchema.optional(),

    seoDescription: translationSchema.optional(),

    category: z
        .string()
        .min(1, "Category is required"),

    tags: z
        .array(
            z.object({
                ar: z.string().trim(),
                en: z.string().trim(),
            })
        )
        .optional(),

    isFeatured: z.preprocess(
        (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        },
        z.boolean().optional()
    ),

    isPublished: z.preprocess(
        (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        },
        z.boolean().optional()
    ),
};


// Create
const createBlogSchema = z
    .object(blogBaseObject)
    .strict();


// Update
const updateBlogSchema = z
    .object(blogBaseObject)
    .partial()
    .strict();

module.exports = {
    createBlogSchema,
    updateBlogSchema,
};