const { z } = require("zod");
// القيمة home موجودة بالفعل في حقل fields.page
/**
 * Localized Text Schema
 */
const localizedTextSchema = z
    .object({
        ar: z.string().trim().optional(),
        en: z.string().trim().optional(),
    })
    .refine((data) => data.ar || data.en, {
        message: "At least one language is required",
    });

/**
 * Page Section Item Schema
 */
const pageSectionItemSchema = z.object({
    icon: z.string().trim().optional(),
    content: z
        .object({
            title: localizedTextSchema.nullable().optional(),
            description: localizedTextSchema.nullable().optional(),
        })
        .optional(),
});
/**
 * Page Section Content Schema
 */
const pageSectionContentSchema = z.object({
    badge: localizedTextSchema.nullable().optional(),
    title: localizedTextSchema.nullable().optional(),
    description: localizedTextSchema.nullable().optional(),
});
/**
 * Create Page Section Schema
 */
const createPageSectionSchema = z.object({
    page: z.string().trim().min(1, "Page is required"),
    section: z.string().trim().min(1, "Section is required"),
    content: pageSectionContentSchema.optional(),
    items: z.array(pageSectionItemSchema).optional(),
    isActive: z.boolean().optional(),
});
/**
 * Update Page Section Schema
 */
const updatePageSectionSchema = createPageSectionSchema.partial();

module.exports = {
    createPageSectionSchema,
    updatePageSectionSchema,
};
