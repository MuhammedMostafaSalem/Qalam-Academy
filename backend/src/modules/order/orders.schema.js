const { z } = require("zod");

const paymentMethods = [
    "card",
    "vodafone_cash",
    "etisalat_cash",
    "orange_cash",
    "fawry",
    "paypal",
];

// Create Order
const createOrderSchema = z.object({
    paymentMethod: z
        .string()
        .refine(
            (value) => paymentMethods.includes(value),
            {
                message: "Invalid payment method",
            }
        ),
}).strict();

module.exports = {
    createOrderSchema,
};