"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Portfolio Projects
export async function getPortfoliosAction(queryString = "") {
    try {
        const response = await authApi(`/portfolios?${queryString}`, {
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
            message: error?.message || "فشل جلب المشاريع",
            data: [],
            meta: null,
        };
    }
}

// Get Portfolio Project by ID
export async function getPortfolioByIdAction(id) {
    try {
        const response = await authApi(`/portfolios/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل المشروع",
            data: null,
        };
    }
}

// Create Portfolio Project
export async function createPortfolioAction(prevState, formData) {
    try {
        const body = new FormData();

        body.append("title.ar", formData.get("titleAr") || "");
        body.append("title.en", formData.get("titleEn") || "");
        body.append("description.ar", formData.get("descriptionAr") || "");
        body.append("description.en", formData.get("descriptionEn") || "");

        const category = formData.get("category");
        if (category) body.append("category", category);

        const projectUrl = formData.get("projectUrl");
        if (projectUrl) body.append("projectUrl", projectUrl);

        const githubUrl = formData.get("githubUrl");
        if (githubUrl) body.append("githubUrl", githubUrl);

        const technologies = formData.get("technologies");
        if (technologies) body.append("technologies", technologies);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/portfolios", {
            method: "POST",
            body,
        });

        revalidatePath("/dashboard/projects");
        revalidatePath("/portfolio");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء المشروع بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إنشاء المشروع",
            errors: error?.errors || null,
        };
    }
}

// Update Portfolio Project
export async function updatePortfolioAction(id, prevState, formData) {
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

        const category = formData.get("category");
        if (category) body.append("category", category);

        const projectUrl = formData.get("projectUrl");
        if (projectUrl) body.append("projectUrl", projectUrl);

        const githubUrl = formData.get("githubUrl");
        if (githubUrl) body.append("githubUrl", githubUrl);

        const technologies = formData.get("technologies");
        if (technologies) body.append("technologies", technologies);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi(`/portfolios/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/projects");
        revalidatePath("/portfolio");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث المشروع بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث المشروع",
            errors: error?.errors || null,
        };
    }
}

// Delete Portfolio Project
export async function deletePortfolioAction(id) {
    try {
        await authApi(`/portfolios/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/projects");
        revalidatePath("/portfolio");

        return {
            success: true,
            message: "تم حذف المشروع بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف المشروع",
        };
    }
}
