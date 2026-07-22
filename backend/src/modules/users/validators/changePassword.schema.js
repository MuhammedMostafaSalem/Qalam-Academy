const { z } = require("zod");

const changePasswordSchema = z.object({
    currentPassword: z
        .string({ error: "Current password is required" })
        .min(8, "Current password must be at least 8 characters")
        .max(100, "Current password must not exceed 100 characters"),

    newPassword: z
        .string({ error: "New password is required" })
        .min(8, "New password must be at least 8 characters")
        .max(100, "New password must not exceed 100 characters"),

    confirmPassword: z
        .string({ error: "Confirm password is required" }),
}).strict();

module.exports = {
    changePasswordSchema,
};