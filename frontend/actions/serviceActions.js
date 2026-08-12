"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Services
export async function getServicesAction(queryString = "") {
    try {
        const response = await authApi(`/services?${queryString}`, {
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
            message: error?.message || "فشل جلب الخدمات",
            data: [],
            meta: null,
        };
    }
}

// Get Service by ID
export async function getServiceByIdAction(id) {
    try {
        const response = await authApi(`/services/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الخدمة",
            data: null,
        };
    }
}

// Create Service
export async function createServiceAction(prevState, formData) {
    try {
        const body = new FormData();

        body.append("title.ar", formData.get("titleAr") || "");
        body.append("title.en", formData.get("titleEn") || "");
        body.append("description.ar", formData.get("descriptionAr") || "");
        body.append("description.en", formData.get("descriptionEn") || "");

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/services", {
            method: "POST",
            body,
        });

        revalidatePath("/dashboard/services");
        revalidatePath("/services");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء الخدمة بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إنشاء الخدمة",
            errors: error?.errors || null,
        };
    }
}

// Update Service
export async function updateServiceAction(id, prevState, formData) {
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

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi(`/services/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/services");
        revalidatePath("/services");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الخدمة بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث الخدمة",
            errors: error?.errors || null,
        };
    }
}

// Delete Service
export async function deleteServiceAction(id) {
    try {
        await authApi(`/services/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/services");
        revalidatePath("/services");

        return {
            success: true,
            message: "تم حذف الخدمة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف الخدمة",
        };
    }
}
