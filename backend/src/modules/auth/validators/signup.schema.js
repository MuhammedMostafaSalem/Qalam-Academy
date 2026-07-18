const { z } = require("zod");

const signupSchema = z.object({
    username: z.string({ error: "Username is required" })
        .trim()
        .min(2, "Username must be at least 2 characters")
        .max(30, "Username must be at most 30 characters"),

    email: z.string({ error: "Email is required" })
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),

    password: z.string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,20}$/,
            "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
        ),
});

module.exports = signupSchema;