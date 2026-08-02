const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const serviceBaseObject = {
    title: z.object({
        ar: z
            .string({ error: "عنوان الخدمة مطلوب" })
            .trim()
            .min(2, "عنوان الخدمة يجب أن يكون على الأقل 2 أحرف")
            .max(100, "عنوان الخدمة يجب ألا يتجاوز 100 حرف"),
        en: z
            .string({ error: "Service title is required" })
            .trim()
            .min(2, "Service title must be at least 2 characters")
            .max(100, "Service title must not exceed 100 characters"),
    }),

    description: z.object({
        ar: z
            .string({ error: "وصف الخدمة مطلوب" })
            .trim()
            .min(10, "وصف الخدمة يجب أن يكون على الأقل 10 أحرف")
            .max(3000, "وصف الخدمة يجب ألا يتجاوز 3000 حرف"),
        en: z
            .string({ error: "Service description is required" })
            .trim()
            .min(10, "Service description must be at least 10 characters")
            .max(3000, "Service description must not exceed 3000 characters"),
    }),

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