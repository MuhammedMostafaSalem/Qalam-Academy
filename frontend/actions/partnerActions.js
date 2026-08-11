"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Partners
export async function getPartnersAction(queryString = "") {
    try {
        const response = await authApi(`/partners?${queryString}`, {
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
            message: error?.message || "فشل جلب الشركاء",
            data: [],
            meta: null,
        };
    }
}

// Create Partner
export async function createPartnerAction(prevState, formData) {
    try {
        const body = new FormData();

        const name = formData.get("name");
        if (name) body.append("name", name);

        const website = formData.get("website");
        if (website) body.append("website", website);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/partners", {
            method: "POST",
            body,
        });

        revalidatePath("/dashboard/partners");
        revalidatePath("/about");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إضافة الشريك بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إضافة الشريك",
            errors: error?.errors || null,
        };
    }
}

// Update Partner
export async function updatePartnerAction(id, prevState, formData) {
    try {
        const body = new FormData();

        const name = formData.get("name");
        if (name) body.append("name", name);

        const website = formData.get("website");
        if (website) body.append("website", website);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi(`/partners/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/partners");
        revalidatePath("/about");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الشريك بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث الشريك",
            errors: error?.errors || null,
        };
    }
}

// Delete Partner
export async function deletePartnerAction(id) {
    try {
        await authApi(`/partners/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/partners");
        revalidatePath("/about");

        return {
            success: true,
            message: "تم حذف الشريك بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف الشريك",
        };
    }
}
