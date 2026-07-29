const { z } = require("zod");

// Base Object
const userBaseObject = {
    firstName: z.string({ error: "Firstname is required" })
        .trim()
        .min(2, "Firstname must be at least 2 characters")
        .max(30, "Firstname must be at most 30 characters"),

    lastName: z.string({ error: "Lastname is required" })
        .trim()
        .min(2, "Lastname must be at least 2 characters")
        .max(30, "Lastname must be at most 30 characters"),

    email: z.string({ error: "Email is required" })
        .email("Please enter a valid email address")
        .trim(),

    phone: z.string({ error: "Phone number is required" })
        .trim()
        .regex(
            /^\+?[1-9]\d{9,14}$/,
            "Please enter a valid phone number in international format."
        ),

    country: z.string({ error: "Country is required" })
        .trim()
        .min(2, "Country must be at least 2 characters")
        .max(100, "Country must be at most 100 characters"),

    city: z.string({ error: "City is required" })
        .trim()
        .min(2, "City must be at least 2 characters")
        .max(100, "City must be at most 100 characters"),

    address: z.string({ error: "Address is required" })
        .trim()
        .min(5, "Address must be at least 2 characters")
        .max(300, "Address must be at most 300 characters"),

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