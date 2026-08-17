"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Timeline Items
export async function getTimelineAction(queryString = "") {
    try {
        const response = await authApi(`/timeline?${queryString}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
            meta: response.meta,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب الجدول الزمني",
            data: [],
            meta: null,
        };
    }
}

// Get Single Timeline Item by ID
export async function getTimelineByIdAction(id) {
    try {
        const response = await authApi(`/timeline/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب عنصر الجدول الزمني",
            data: null,
        };
    }
}

// Create Timeline Item (Admin)
export async function createTimelineAction(prevState, formData) {
    try {
        const year = formData.get("year");
        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");

        const response = await authApi("/timeline", {
            method: "POST",
            body: JSON.stringify({
                year: Number(year),
                title: { ar: titleAr, en: titleEn },
                description: descriptionAr || descriptionEn ? { ar: descriptionAr, en: descriptionEn } : undefined,
            }),
        });

        revalidatePath("/about");
        revalidatePath("/dashboard");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء العنصر بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إنشاء العنصر في الجدول الزمني",
            errors: error?.errors || null,
        };
    }
}

// Update Timeline Item (Admin)
export async function updateTimelineAction(id, prevState, formData) {
    try {
        const year = formData.get("year");
        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");

        const payload = {};
        if (year) payload.year = Number(year);
        if (titleAr || titleEn) payload.title = { ar: titleAr, en: titleEn };
        if (descriptionAr || descriptionEn) payload.description = { ar: descriptionAr, en: descriptionEn };

        const response = await authApi(`/timeline/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        revalidatePath("/about");
        revalidatePath("/dashboard");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث العنصر بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث العنصر",
            errors: error?.errors || null,
        };
    }
}

// Delete Timeline Item (Admin)
export async function deleteTimelineAction(id) {
    try {
        const response = await authApi(`/timeline/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/about");
        revalidatePath("/dashboard");

        return {
            success: true,
            message: response.message || "تم حذف العنصر بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف العنصر",
        };
    }
}
