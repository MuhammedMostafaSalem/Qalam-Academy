const { z } = require("zod");

/*
    Shared Fields
*/
const contactBaseObject = {
    fullName: z
        .string({
            required_error: "Full name is required",
        })
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters"),

    email: z
        .string({
            required_error: "Email is required",
        })
        .trim()
        .email("Invalid email address"),

    phone: z
        .string()
        .trim()
        .min(8, "Phone number is too short")
        .max(20, "Phone number is too long")
        .optional()
        .or(z.literal("")),

    subject: z
        .string({
            required_error: "Subject is required",
        })
        .trim()
        .min(3, "Subject must be at least 3 characters")
        .max(200, "Subject must not exceed 200 characters"),

    message: z
        .string({
            required_error: "Message is required",
        })
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(5000, "Message must not exceed 5000 characters"),

    status: z.enum(
        [
            "unread",
            "read",
            "replied",
        ]
    ).optional(),

    reply: z
        .string()
        .trim()
        .max(5000, "Reply must not exceed 5000 characters")
        .optional()
        .or(z.literal("")),
};

/*
    Create
*/
const createContactSchema = z
    .object({
        fullName: contactBaseObject.fullName,
        email: contactBaseObject.email,
        phone: contactBaseObject.phone,
        subject: contactBaseObject.subject,
        message: contactBaseObject.message,
    });

/*
    Update
*/
const updateContactSchema = z
    .object({
        status: contactBaseObject.status,
        reply: contactBaseObject.reply,
    });

module.exports = {
    createContactSchema,
    updateContactSchema,
};