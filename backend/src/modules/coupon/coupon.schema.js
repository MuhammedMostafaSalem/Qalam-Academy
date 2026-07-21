const { z } = require("zod");

// Base Object
const couponBaseObject = {
    title: z.string({ error: "Coupon title is required" })
        .trim()
        .min(2, "Coupon title must be at least 2 characters")
        .max(100, "Coupon title must not exceed 100 characters"),

    code: z.string({ error: "Coupon code is required" })
        .trim()
        .min(3, "Coupon code must be at least 3 characters")
        .max(50, "Coupon code must not exceed 50 characters")
        .transform(value => value.toUpperCase()),

    description: z.string({ error: "Description is required" })
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    discountType: z
    // .string({ error: "Discount type is required" })
    .enum(
        [
            "fixed",
            "percentage",
        ],
        {
            errorMap: () => ({
                message: "Invalid discount type",
            }),
        }
    ),

    discountValue: z.coerce
        .number({ error: "Discount value is required" })
        .min(1, "Discount value must be greater than zero"),

    minimumAmount: z.coerce
        .number()
        .min(0, "Minimum amount cannot be negative")
        .optional(),

    maximumDiscount: z.coerce
        .number()
        .min(0, "Maximum discount cannot be negative")
        .optional(),

    usageLimit: z.coerce
        .number()
        .min(0, "Usage limit cannot be negative")
        .optional(),

    startDate: z.coerce.date({
        invalid_type_error: "Invalid start date",
    }),

    endDate: z.coerce.date({
        invalid_type_error: "Invalid end date",
    }),

    applicableCourses: z.preprocess(
        value => {
            if (!value) return [];

            return Array.isArray(value)
                ? value
                : [value];
        },
        z.array(
            z.string().trim().min(1)
        ).optional()
    ),

    applicableCategories: z.preprocess(
        value => {
            if (!value) return [];

            return Array.isArray(value)
                ? value
                : [value];
        },
        z.array(
            z.string().trim().min(1)
        ).optional()
    ),
};

const updateFields = {
    ...couponBaseObject,

    isActive: z.boolean().optional(),
};

// Create
const createCouponSchema = z.object(couponBaseObject)
    .strict()
    .refine(
        data =>
            data.discountType !== "percentage" ||
            data.discountValue <= 100,
        {
            message: "Percentage discount cannot exceed 100%",
            path: ["discountValue"],
        }
    )
    .refine(
        data => data.endDate > data.startDate,
        {
            message: "End date must be greater than start date",
            path: ["endDate"],
        }
    );

// Update
const updateCouponSchema = z.object(updateFields)
    .partial()
    .strict()
    .refine(
        data =>
            data.discountType !== "percentage" ||
            data.discountValue === undefined ||
            data.discountValue <= 100,
        {
            message: "Percentage discount cannot exceed 100%",
            path: ["discountValue"],
        }
    )
    .refine(
        data =>
            !data.startDate ||
            !data.endDate ||
            data.endDate > data.startDate,
        {
            message: "End date must be greater than start date",
            path: ["endDate"],
        }
    );

module.exports = {
    createCouponSchema,
    updateCouponSchema,
};