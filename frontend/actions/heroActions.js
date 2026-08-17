"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Public: Get Hero by Page name (home, courses, blog, contact, services, portfolio, store, about)
export async function getHeroByPageAction(page) {
    try {
        const response = await authApi(`/heroes/page/${page}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب هيرو الصفحة",
            data: null,
        };
    }
}

// Admin: Get All Heroes
export async function getHeroesAction(queryString = "") {
    try {
        const response = await authApi(`/heroes?${queryString}`, {
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
            message: error?.message || "فشل جلب أقسام الهيرو",
            data: [],
            meta: null,
        };
    }
}

// Admin: Get Hero by ID
export async function getHeroByIdAction(id) {
    try {
        const response = await authApi(`/heroes/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب الهيرو",
            data: null,
        };
    }
}

// Admin: Create Hero
export async function createHeroAction(prevState, formData) {
    try {
        const body = new FormData();

        const page = formData.get("page");
        if (page) body.append("page", page);

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

        const response = await authApi("/heroes", {
            method: "POST",
            body,
        });

        revalidatePath("/");
        revalidatePath("/dashboard");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء قسم الهيرو بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إنشاء قسم الهيرو",
            errors: error?.errors || null,
        };
    }
}

// Admin: Update Hero
export async function updateHeroAction(id, prevState, formData) {
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
        const removeImage = formData.get("removeImage");
        if (removeImage === "true") {
            body.append("image", "");
        } else if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi(`/heroes/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/");
        revalidatePath("/dashboard");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الهيرو بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث الهيرو",
            errors: error?.errors || null,
        };
    }
}

// Admin: Delete Hero
export async function deleteHeroAction(id) {
    try {
        const response = await authApi(`/heroes/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/");
        revalidatePath("/dashboard");

        return {
            success: true,
            message: response.message || "تم حذف الهيرو بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف الهيرو",
        };
    }
}
