const { z } = require("zod");

// const serviceSchema = z.object({
//     title: z.string()
//         .trim()
//         .min(2, "Service title must be at least 2 characters")
//         .max(100, "Service title must not exceed 100 characters"),

//     description: z.string()
//         .trim()
//         .min(10, "Service description must be at least 10 characters")
//         .max(3000, "Service description must not exceed 3000 characters"),

//     isActive: z
//         .boolean()
//         .optional(),
// }).strict();
// 1. Basic field rules (to avoid repeating min and max)
const serviceBaseObject = {
    title: z.string()
        .trim()
        .min(2, "Service title must be at least 2 characters")
        .max(100, "Service title must not exceed 100 characters"),

    description: z.string()
        .trim()
        .min(10, "Service description must be at least 10 characters")
        .max(3000, "Service description must not exceed 3000 characters"),

    isActive: z
        .boolean()
        .optional(),
}

// 2. Creation schema (all fields are mandatory)
const createServiceSchema = z.object(serviceBaseObject).strict();

// 3. The update schema (all fields are optional using .partial)
const updateServiceSchema = z.object(serviceBaseObject).partial().strict();

module.exports = {
    createServiceSchema,
    updateServiceSchema,
}