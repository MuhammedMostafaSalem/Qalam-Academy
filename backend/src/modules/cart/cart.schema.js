const { z } = require("zod");

// Add To Cart
const addToCartSchema = z
    .object({
        course: z.string().trim().optional(),
        product: z.string().trim().optional(),
    })
    .strict()
    .refine(
        (data) =>
            (data.course && !data.product) ||
            (!data.course && data.product),
        {
            message: "Please send either course or product",
            path: ["course"],
        }
    );

// Apply Coupon
const applyCouponSchema = z.object({
    coupon: z.string()
        .trim()
        .min(2, "Coupon is required"),
}).strict();

module.exports = {
    addToCartSchema,
    applyCouponSchema,
};