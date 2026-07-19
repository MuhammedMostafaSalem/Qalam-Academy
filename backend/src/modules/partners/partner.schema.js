const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const portfolioBaseObject = {
    title: z.string()
        .trim()
        .min(2, "Portfolio title must be at least 2 characters")
        .max(100, "Portfolio title must not exceed 100 characters"),

    partnerUrl: z.string()
        .url("Invalid partner URL")
        .trim()
        .or(z.literal(""))
        .optional(),
}

// 2. Creation schema (all fields are mandatory)
const createPartnerSchema = z.object(portfolioBaseObject).strict();

// 3. The update schema (all fields are optional using .partial)
const updatePartnerSchema = z.object(portfolioBaseObject).partial().strict();

module.exports = {
    createPartnerSchema,
    updatePartnerSchema,
}