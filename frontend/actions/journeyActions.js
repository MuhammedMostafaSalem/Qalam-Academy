"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Journey Singleton
export async function getJourneyAction() {
    try {
        const response = await authApi("/journey", {
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

        const badgeTextAr = formData.get("badgeTextAr");
        const badgeTextEn = formData.get("badgeTextEn");
        if (badgeTextAr) body.append("badgeText.ar", badgeTextAr);
        if (badgeTextEn) body.append("badgeText.en", badgeTextEn);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/journey", {
            method: "PATCH",
            body,
        });

        revalidatePath("/about");
        revalidatePath("/dashboard");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث بيانيات الرحلة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث بيانيات الرحلة",
            errors: error?.errors || null,
        };
    }
}
