const { z } = require("zod");

// 1. Basic field rules (to avoid repeating min and max)
const teamBaseObject = {
    user: z
        .string({error: "User is required"})
        .trim(),

    position: z
        .string({error: "Position is required"})
        .trim()
        .min(2, "Position must be at least 2 characters")
        .max(100, "Position must not exceed 100 characters"),

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