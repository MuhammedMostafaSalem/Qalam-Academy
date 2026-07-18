const { z } = require("zod");

const resetSchema = z.object({
    email: z.string({ error: "Email is required" })
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),

    password: z.string({ error: "password is required" })
        .trim()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,20}$/,
            "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
        ),

    confirmPassword: z.string({ error: "confirm password is required" })
        .trim()
        .min(6, "Confirm password must be at least 6 characters")
        .max(20, "Confirm password must be at most 20 characters"),
}).strict();

module.exports = resetSchema;