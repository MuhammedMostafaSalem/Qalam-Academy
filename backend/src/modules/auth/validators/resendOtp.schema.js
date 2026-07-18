const { z } = require("zod");

const resendOtpSchema = z
    .object({
        email: z.string({error: "Email is required"})
            .email("Please enter a valid email address")
            .trim()
            .toLowerCase(),

        purpose: z.enum(
            ["email_verification", "forgot_password"],
            {
                error: "Invalid OTP purpose",
            }
        ),
    })
    .strict();

module.exports = resendOtpSchema;