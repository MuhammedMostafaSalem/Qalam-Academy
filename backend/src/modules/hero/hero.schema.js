const { z } = require("zod");

// Enums
const pages = [
    "home",
    "about",
    "courses",
    "course-details",
    "products",
    "product-details",
    "blog",
    "blog-details",
    "contact",
    "wishlist",
    "cart",
    "checkout",
    "login",
    "register",
    "forgot-password",
    "reset-password",
    "profile",
    "dashboard",
];

const layouts = [
    "center",
    "left",
    "right",
    "split",
    "video",
    "minimal",
];

const textAlignments = [
    "left",
    "center",
    "right",
];


// Create Hero
const createHeroSchema = z.object({
    page: z.enum(pages, {
        required_error: "Page is required",
        invalid_type_error: "Invalid page",
    }),

    title: z
        .string({
            required_error: "Title is required",
        })
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title cannot exceed 200 characters"),

    subtitle: z
        .string()
        .trim()
        .max(200)
        .optional(),

    description: z
        .string()
        .trim()
        .max(2000)
        .optional(),

    buttonText: z
        .string()
        .trim()
        .max(100)
        .optional(),

    buttonLink: z
        .string()
        .trim()
        .max(255)
        .optional(),

    secondaryButtonText: z
        .string()
        .trim()
        .max(100)
        .optional(),

    secondaryButtonLink: z
        .string()
        .trim()
        .max(255)
        .optional(),

    layout: z
        .enum(layouts)
        .optional(),

    textAlignment: z
        .enum(textAlignments)
        .optional(),

    isActive: z
        .boolean()
        .optional(),

    sortOrder: z
        .coerce
        .number()
        .min(1)
        .optional(),

    seoTitle: z
        .string()
        .trim()
        .max(200)
        .optional(),

    seoDescription: z
        .string()
        .trim()
        .max(500)
        .optional(),

}).strict();


// Update Hero
const updateHeroSchema = z.object({
    page: z
        .enum(pages)
        .optional(),

    title: z
        .string()
        .trim()
        .min(3)
        .max(200)
        .optional(),

    subtitle: z
        .string()
        .trim()
        .max(200)
        .optional(),

    description: z
        .string()
        .trim()
        .max(2000)
        .optional(),

    buttonText: z
        .string()
        .trim()
        .max(100)
        .optional(),

    buttonLink: z
        .string()
        .trim()
        .max(255)
        .optional(),

    secondaryButtonText: z
        .string()
        .trim()
        .max(100)
        .optional(),

    secondaryButtonLink: z
        .string()
        .trim()
        .max(255)
        .optional(),

    layout: z
        .enum(layouts)
        .optional(),

    textAlignment: z
        .enum(textAlignments)
        .optional(),

    isActive: z
        .boolean()
        .optional(),

    sortOrder: z
        .coerce
        .number()
        .min(1)
        .optional(),

    seoTitle: z
        .string()
        .trim()
        .max(200)
        .optional(),

    seoDescription: z
        .string()
        .trim()
        .max(500)
        .optional(),

})
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "Please provide at least one field to update",
        }
    );

module.exports = {
    createHeroSchema,
    updateHeroSchema,
}