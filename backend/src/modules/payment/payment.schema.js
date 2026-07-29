const { z } = require("zod");

// Create Payment
const createPaymentSchema = z
    .object({
        orderId: z
            .string()
            .trim()
            .min(1, ),
    })
    .strict();

module.exports = {
    createPaymentSchema,
}