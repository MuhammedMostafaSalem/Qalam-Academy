"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

const heroTextFields = [
    ["titleAr", "title.ar"],
    ["titleEn", "title.en"],
    ["subtitleAr", "subtitle.ar"],
    ["subtitleEn", "subtitle.en"],
    ["descriptionAr", "description.ar"],
    ["descriptionEn", "description.en"],
    ["buttonTextAr", "buttonText.ar"],
    ["buttonTextEn", "buttonText.en"],
    ["buttonLink", "buttonLink"],
    ["secondaryButtonTextAr", "secondaryButtonText.ar"],
    ["secondaryButtonTextEn", "secondaryButtonText.en"],
    ["secondaryButtonLink", "secondaryButtonLink"],
    ["layout", "layout"],
    ["textAlignment", "textAlignment"],
    ["sortOrder", "sortOrder"],
    ["seoTitle", "seoTitle"],
    ["seoDescription", "seoDescription"],
];

const heroFileFields = ["image", "backgroundImage", "video"];

function buildHeroFormData(formData, { includePage = false } = {}) {
    const body = new FormData();

    if (includePage) {
        body.append("page", formData.get("page") || "");
    }

    heroTextFields.forEach(([source, target]) => {
        const value = formData.get(source);
        if (value !== null) {
            body.append(target, value);
        }
    });

    body.append("isActive", formData.get("isActive") === "true" ? "true" : "false");

    heroFileFields.forEach((field) => {
        const file = formData.get(field);
        if (file instanceof File && file.size > 0) {
            body.append(field, file);
        }
    });

    return body;
}

function revalidateHeroPages() {
    [
        "/",
        "/about",
        "/services",
        "/courses",
        "/portfolio",
        "/store",
        "/blog",
        "/contact",
        "/dashboard/heroes",
    ].forEach((path) => revalidatePath(path));
}

// Public: Get Hero by API page key (the /store route uses "products")
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
        const body = buildHeroFormData(formData, { includePage: true });

        const response = await authApi("/heroes", {
            method: "POST",
            body,
        });

        revalidateHeroPages();

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
        const body = buildHeroFormData(formData);

        const response = await authApi(`/heroes/${id}`, {
            method: "PATCH",
            body,
        });

        revalidateHeroPages();

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

        revalidateHeroPages();

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
