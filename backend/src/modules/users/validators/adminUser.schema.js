const { z } = require("zod");
const signupSchema = require("../../auth/validators/signup.schema");

const USER_ROLES = ["admin", "instructor", "student"];

const createUserAdminSchema = signupSchema.extend({
    role: z.enum(USER_ROLES),
    isActive: z.boolean().optional(),
});

const updateUserAdminSchema = z.object({
    role: z.enum(
        USER_ROLES,
        {
            errorMap: () => ({
                message: "Invalid user role",
            }),
        }
    ).optional(),

    isActive: z.boolean().optional(),
});

module.exports = {
    createUserAdminSchema,
    updateUserAdminSchema,
};
