const { z } = require("zod");

const signupSchema = z.object({
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
        .trim()
        .toLowerCase(),

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

    password: z.string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,20}$/,
            "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
        ),
});

module.exports = signupSchema;