const { z } = require("zod");

// Base Object
const productBaseObject = {
    title: z
        .string({ error: "Product title is required" })
        .trim()
        .min(2, "Product title must be at least 2 characters")
        .max(150, "Product title must not exceed 150 characters"),

    description: z
        .string({ error: "Product description is required" })
        .trim()
        .min(20, "Product description must be at least 20 characters")
        .max(10000, "Product description must not exceed 10000 characters"),

    category: z
        .string({ error: "Category is required" })
        .trim()
        .min(1, "Category is required"),

    price: z.coerce
        .number({ error: "Price is required" })
        .min(0, "Price cannot be negative"),

    discountPrice: z.coerce
        .number({ error: "Ddiscoun price is required" })
        .min(0, "Discount price cannot be negative")
        .optional(),

    stock: z.coerce
        .number({ error: "Stock is required" })
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),
};

// Update Fields
const updateFields = {
    ...productBaseObject,
    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
};

// Create Schema
const createProductSchema = z
    .object(productBaseObject)
    .strict()

// Update Schema
const updateProductSchema = z
    .object(updateFields)
    .partial()
    .strict()

module.exports = {
    createProductSchema,
    updateProductSchema,
};