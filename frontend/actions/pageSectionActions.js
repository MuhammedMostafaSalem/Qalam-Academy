"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

/**
 * Get All Page Sections
 */
export async function getPageSectionsAction(queryString = "") {
    try {
        const response = await authApi(
            `/page-sections${queryString ? `?${queryString}` : ""}`,
            {
                method: "GET",
            }
        );

        return {
            success: true,
            data: response.data || [],
            meta: response.meta || null,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب أقسام الصفحات",
            data: [],
            meta: null,
        };
    }
}

/**
 * Get Page Section By ID
 */
export async function getPageSectionByIdAction(id) {
    try {
        const response = await authApi(
            `/page-sections/${id}`,
            {
                method: "GET",
            }
        );

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب قسم الصفحة",
            data: null,
        };
    }
}

/**
 * Create Page Section
 */
export async function createPageSectionAction(data) {
    try {
        const response = await authApi(
            "/page-sections",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        revalidatePath("/dashboard/page-sections");

        return {
            success: true,
            data: response.data,
            message:
                response.message ||
                "تم إنشاء قسم الصفحة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message:
                error?.message ||
                "فشل إنشاء قسم الصفحة",
            errors: error?.errors || null,
        };
    }
}

/**
 * Update Page Section
 */
export async function updatePageSectionAction(id, data) {
    try {
        const response = await authApi(
            `/page-sections/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            }
        );

        revalidatePath("/dashboard/page-sections");

        return {
            success: true,
            data: response.data,
            message:
                response.message ||
                "تم تحديث قسم الصفحة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error?.message ||
                "فشل تحديث قسم الصفحة",
            errors: error?.errors || null,
        };
    }
}

/**
 * Delete Page Section
 */
export async function deletePageSectionAction(id) {
    try {
        await authApi(
            `/page-sections/${id}`,
            {
                method: "DELETE",
            }
        );

        revalidatePath("/dashboard/page-sections");

        return {
            success: true,
            message:
                "تم حذف قسم الصفحة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error?.message ||
                "فشل حذف قسم الصفحة",
        };
    }
}