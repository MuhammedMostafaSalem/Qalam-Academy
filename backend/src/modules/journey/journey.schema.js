const { z } = require("zod");

const translatedField = (arabicName, englishName) =>
    z.object({
        ar: z
            .string({
                required_error: `${arabicName} مطلوب`,
            })
            .trim()
            .min(2, `${arabicName} يجب أن يكون على الأقل حرفين`)
            .max(3000),

        en: z
            .string({
                required_error: `${englishName} is required`,
            })
            .trim()
            .min(2, `${englishName} must be at least 2 characters`)
            .max(3000),
    });

const updateJourneySchema = z
    .object({
        title: translatedField(
            "العنوان",
            "Title"
        ).optional(),

        description: translatedField(
            "الوصف",
            "Description"
        ).optional(),

        badge: translatedField(
            "عنوان الشارة",
            "Badge"
        ).optional(),

        badgeDescription: translatedField(
            "وصف الشارة",
            "Badge Description"
        ).optional(),

        isActive: z.preprocess(
            (value) => {
                if (value === "true") return true;
                if (value === "false") return false;
                return value;
            },
            z.boolean().optional()
        ),
    })
    .strict();

module.exports = {
    updateJourneySchema,
};