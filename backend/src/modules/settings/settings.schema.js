const { z } = require("zod");

const colorSchema = z
    .string()
    .regex(
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        "Invalid HEX color"
    );

const paletteSchema = z.object({
    primary: colorSchema,
    secondary: colorSchema,
    accent: colorSchema,

    background: colorSchema,
    surface: colorSchema,

    text: colorSchema,
    mutedText: colorSchema,

    border: colorSchema,

    success: colorSchema,
    warning: colorSchema,
    danger: colorSchema,
});

const updateThemeSchema = z.object({
    theme: z.object({
        light: paletteSchema,
        dark: paletteSchema,
    }),
});

const updateSettingsSchema = z.object({
    // Site
    siteName: z
        .string()
        .trim()
        .min(2, "Site name must be at least 2 characters")
        .max(100, "Site name cannot exceed 100 characters")
        .optional(),

    siteDescription: z
        .string()
        .trim()
        .max(1000, "Site description cannot exceed 1000 characters")
        .optional(),

    // Contact
    supportEmail: z
        .union([z.literal(""), z.email("Invalid support email")])
        .optional(),

    supportPhone: z
        .string()
        .trim()
        .max(30)
        .optional(),

    whatsapp: z
        .string()
        .trim()
        .max(30)
        .optional(),

    address: z
        .string()
        .trim()
        .max(300)
        .optional(),

    // Social
    facebook: z
        .union([z.literal(""), z.url("Invalid Facebook URL")])
        .optional(),

    instagram: z
        .union([z.literal(""), z.url("Invalid Instagram URL")])
        .optional(),

    linkedin: z
        .union([z.literal(""), z.url("Invalid LinkedIn URL")])
        .optional(),

    youtube: z
        .union([z.literal(""), z.url("Invalid YouTube URL")])
        .optional(),

    twitter: z
        .union([z.literal(""), z.url("Invalid Twitter URL")])
        .optional(),

    tiktok: z
        .union([z.literal(""), z.url("Invalid TikTok URL")])
        .optional(),

    // Platform
    allowRegistration: z.preprocess(
        (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        },
        z.boolean()
    ).optional(),

    maintenanceMode: z.preprocess(
        (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        },
        z.boolean()
    ).optional(),

    // SEO
    seoTitle: z
        .string()
        .trim()
        .max(100)
        .optional(),

    seoDescription: z
        .string()
        .trim()
        .max(300)
        .optional(),

    seoKeywords: z.preprocess(
        (value) => {
            if (Array.isArray(value)) return value;
            if (typeof value !== "string") return value;
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return value.split(",").map((keyword) => keyword.trim()).filter(Boolean);
            }
        },
        z.array(z.string().trim()).optional()
    ),

    currency: z
        .string()
        .trim()
        .min(2)
        .max(10)
        .optional(),

    defaultLanguage: z
        .enum(["ar", "en"])
        .optional(),

})
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "Please provide at least one field to update",
        }
    );

module.exports = {
    updateSettingsSchema,
    updateThemeSchema
};
