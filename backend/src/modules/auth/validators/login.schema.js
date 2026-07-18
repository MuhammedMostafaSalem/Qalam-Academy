const { z } = require("zod");

const loginSchema = z
    .object({
        email: z.string({error: "Email is required"})
            .email("Please enter a valid email address")
            .trim()
            .toLowerCase(),

        password: z
            .string()
            .trim()
            .min(1, "Password is required")
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,20}$/,
                "Password must be 6-20 characters, contain at least one letter and one number, and may include symbols: _@$!%*#?&-"
            ),
    })
    .strict();

module.exports = loginSchema;