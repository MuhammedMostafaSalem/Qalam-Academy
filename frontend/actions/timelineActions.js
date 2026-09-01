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
        const isActive = formData.get("isActive");

        const response = await authApi("/timeline", {
            method: "POST",
            body: JSON.stringify({
                year: Number(year),
                title: { ar: titleAr, en: titleEn },
                isActive: isActive === null ? true : isActive === "true",
            }),
        });

        revalidatePath("/about");
        revalidatePath("/dashboard/journey");

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
        const sortOrder = formData.get("sortOrder");
        const isActive = formData.get("isActive");

        const payload = {};
        if (formData.has("year") && year !== "") payload.year = Number(year);
        if (formData.has("titleAr") || formData.has("titleEn")) {
            payload.title = { ar: titleAr, en: titleEn };
        }
        if (formData.has("sortOrder") && sortOrder !== "") payload.sortOrder = Number(sortOrder);
        if (formData.has("isActive")) payload.isActive = isActive === "true";

        const response = await authApi(`/timeline/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        revalidatePath("/about");
        revalidatePath("/dashboard/journey");

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
        revalidatePath("/dashboard/journey");

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
