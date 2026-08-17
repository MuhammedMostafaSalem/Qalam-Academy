"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Choose Us Singleton
export async function getChooseUsAction() {
    try {
        const response = await authApi("/choose", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل لماذا تختارنا",
            data: null,
        };
    }
}

// Update Choose Us Singleton (Admin)
export async function updateChooseUsAction(prevState, formData) {
    try {
        const body = new FormData();

        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        if (titleAr) body.append("title.ar", titleAr);
        if (titleEn) body.append("title.en", titleEn);

        const subtitleAr = formData.get("subtitleAr");
        const subtitleEn = formData.get("subtitleEn");
        if (subtitleAr) body.append("subtitle.ar", subtitleAr);
        if (subtitleEn) body.append("subtitle.en", subtitleEn);

        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");
        if (descriptionAr) body.append("description.ar", descriptionAr);
        if (descriptionEn) body.append("description.en", descriptionEn);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/choose", {
            method: "PATCH",
            body,
        });

        revalidatePath("/");
        revalidatePath("/dashboard");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث بيانيات لماذا تختارنا بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث بيانيات لماذا تختارنا",
            errors: error?.errors || null,
        };
    }
}
