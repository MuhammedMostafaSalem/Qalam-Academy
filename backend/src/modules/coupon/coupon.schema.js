const { z } = require("zod");

// Base Object
const couponBaseObject = {
    name: z
        .string({ error: "Coupon name is required" })
        .trim()
        .min(2, "Coupon name must be at least 2 characters")
        .max(100, "Coupon name must not exceed 100 characters"),

    expire: z.coerce
        .date({ error: "Coupon expire time is required"})
        .refine(
            (date) => date > new Date(),
            {
                message: "Expire date must be in the future",
            }
        ),

    discount: z.coerce
        .number({ error: "Coupon discount is required"})
        .gt(0, "Discount must be greater than 0")
        .lte(100, "Discount cannot exceed 100"),

    usageLimit: z.coerce
        .number()
        .int()
        .min(1, "Usage limit must be at least 1")
        .optional(),

    perUserLimit: z.coerce
        .number()
        .int()
        .min(1, "Per user limit must be at least 1")
        .optional(),
}

const updateFields = {
    ...couponBaseObject,

    isActive: z.boolean().optional(),
};

// craete
const createCouponSchema = z.object(couponBaseObject).strict();

// Update
const updateCouponSchema = z.object(updateFields).partial().strict();

module.exports = {
    createCouponSchema,
    updateCouponSchema,
};