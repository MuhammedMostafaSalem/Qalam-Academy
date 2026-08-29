"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Journey Singleton
export async function getJourneyAction(raw = false) {
    try {
        const response = await authApi(`/journey${raw ? "?raw=true" : ""}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل رحلتنا",
            data: null,
        };
    }
}

// Update Journey Singleton (Admin)
export async function updateJourneyAction(prevState, formData) {
    try {
        const body = new FormData();

        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        if (titleAr) body.append("title.ar", titleAr);
        if (titleEn) body.append("title.en", titleEn);

        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");
        if (descriptionAr) body.append("description.ar", descriptionAr);
        if (descriptionEn) body.append("description.en", descriptionEn);

        const badgeAr = formData.get("badgeAr");
        const badgeEn = formData.get("badgeEn");
        if (badgeAr) body.append("badge.ar", badgeAr);
        if (badgeEn) body.append("badge.en", badgeEn);

        const badgeDescriptionAr = formData.get("badgeDescriptionAr");
        const badgeDescriptionEn = formData.get("badgeDescriptionEn");
        if (badgeDescriptionAr) body.append("badgeDescription.ar", badgeDescriptionAr);
        if (badgeDescriptionEn) body.append("badgeDescription.en", badgeDescriptionEn);

        const isActive = formData.get("isActive");
        if (isActive !== null) body.append("isActive", isActive);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/journey", {
            method: "PATCH",
            body,
        });

        revalidatePath("/about");
        revalidatePath("/dashboard/journey");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث بيانات الرحلة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث بيانات الرحلة",
            errors: error?.errors || null,
        };
    }
}
