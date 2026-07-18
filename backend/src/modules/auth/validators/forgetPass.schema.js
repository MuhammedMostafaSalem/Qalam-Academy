const { z } = require("zod");

const forgetSchema = z
    .object({
        email: z.string({error: "Email is required"})
            .email("Please enter a valid email address")
            .trim()
            .toLowerCase(),
    })
    .strict();

module.exports = forgetSchema;