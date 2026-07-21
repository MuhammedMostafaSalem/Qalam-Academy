const { z } = require("zod");

// Base Object
const userBaseObject = {
    username: z.string({ error: "Username is required" })
        .trim()
        .min(2, "Username must be at least 2 characters")
        .max(30, "Username must be at most 30 characters"),

    email: z.string({ error: "Email is required" })
        .email("Please enter a valid email address")
        .trim(),

    bio: z.string({ error: "Bio is required" })
        .trim()
        .max(500, "Bio must not exceed 500 characters")
        .optional(),

    role: z.enum(
        [
            "admin",
            "instructor",
            "student",
        ],
        {
            errorMap: () => ({
                message: "Invalid user role",
            }),
        }
    ),

    isVerified: z.boolean().optional(),
};

// Update Schema
const updateUserSchema = z
    .object(userBaseObject)
    .partial()
    .strict();

module.exports = {
    updateUserSchema,
};