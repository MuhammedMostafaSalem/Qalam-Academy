const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const teamBaseObject = {
    title: z.string()
        .trim()
        .min(2, "Service title must be at least 2 characters")
        .max(100, "Service title must not exceed 100 characters"),

    position: z.string()
        .trim()
        .min(10, "Service description must be at least 10 characters")
        .max(3000, "Service description must not exceed 3000 characters"),

    email: z.string()
        .email("Please enter a valid email address")
        .trim(),

    isActive: z
        .boolean()
        .optional(),
}

// 2. Creation schema (all fields are mandatory)
const createTeamSchema = z.object(teamBaseObject).strict();

// 3. The update schema (all fields are optional using .partial)
const updateTeamSchema = z.object(teamBaseObject).partial().strict();

module.exports = {
    createTeamSchema,
    updateTeamSchema,
}