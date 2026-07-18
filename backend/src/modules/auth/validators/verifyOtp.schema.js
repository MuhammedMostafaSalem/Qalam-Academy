const { z } = require("zod");

const verifyOtpSchema = z.object({
    email: z.string({ error: "Email is required" })
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),

    otp: z.string({ error: "OTP is required"})
        .trim()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),

    purpose: z.enum(
        ["email_verification", "forgot_password"],
        {
            error: "Invalid OTP purpose",
        }
    ),
}).strict();

module.exports = verifyOtpSchema;