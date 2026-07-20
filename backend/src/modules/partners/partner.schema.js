const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const partnerBaseObject = {
    name: z.string({ error: "Partner name is required" })
        .trim()
        .min(2, "Partner name must be at least 2 characters")
        .max(100, "Partner name must not exceed 100 characters"),

    partnerUrl: z.string({ error: "Partner URL is required" })
        .trim()
        .url("Invalid partner URL")
        .or(z.literal(""))
        .optional(),
}

// 2. Creation schema (all fields are mandatory)
const createPartnerSchema = z.object(partnerBaseObject).strict();

// 3. The update schema (all fields are optional using .partial)
const updatePartnerSchema = z.object(partnerBaseObject).partial().strict();

module.exports = {
    createPartnerSchema,
    updatePartnerSchema,
}