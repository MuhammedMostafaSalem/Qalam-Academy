const { z } = require("zod");

const updateUserAdminSchema = z.object({
    role: z.enum(
        ["admin", "instructor", "student"],
        {
            errorMap: () => ({
                message: "Invalid user role",
            }),
        }
    ).optional(),

    isActive: z.boolean().optional(),
}).strict();

module.exports = {
    updateUserAdminSchema,
};