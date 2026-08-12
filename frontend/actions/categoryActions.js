"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

export const addCategoryAction = async (prevStata, formData) => {
    try {
        const body = new FormData();

        // title
        body.append("title[ar]", formData.get("titleAr"));
        body.append("title[en]", formData.get("titleEn"));

        // description
        body.append("description[ar]", formData.get("descriptionAr"));
        body.append("description[en]", formData.get("descriptionEn"));

        // type
        body.append("type", formData.get("type"));

        // isActive
        body.append("isActive", "true");

        // image
        const image = formData.get("image");

        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi("/categories", {
            method: "POST",
            body,
        });

        revalidatePath("/dashboard/categories");
        revalidatePath("/services");
        revalidatePath("/");

        return {
            success: true,
            category: response.data,
            error: null,
            errors: null,
        }
    } catch (err) {
        console.log(err);

        return {
            success: false,
            category: null,
            error: err?.response?.data?.message || err?.message || "Something went wrong",
            errors: err?.response?.data?.errors || null,
        }
    }
}

export const updateCategoryAction = async (id, prevState, formData) => {
    try {
        const body = new FormData();
        
        // title
        body.append("title[ar]", formData.get("titleAr") || "");
        body.append("title[en]", formData.get("titleEn") || "");

        // description
        body.append("description[ar]", formData.get("descriptionAr") || "");
        body.append("description[en]", formData.get("descriptionEn") || "");

        // type
        body.append("type", formData.get("type") || "");

        // isActive
        body.append("isActive", formData.get("isActive") === "true" ? "true" : "false");

        // image
        const image = formData.get("image");
        const removeImage = formData.get("removeImage");

        if (removeImage === "true") {
            body.append("image", "");
        } else if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const response = await authApi(`/categories/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/categories");
        revalidatePath("/services");
        revalidatePath("/");

        return {
            success: true,
            // message: "تم تعديل التصنيف بنجاح",
            message: response.message,
            category: response.data,
        }
    } catch (err) {
        console.log(err);

        return {
            success: false,
            error: err?.response?.data?.message || err?.message || "Something went wrong",
        };
    }
}

export async function updateCategoryFieldAction(id, updateData) {
    try {
        const response = await authApi(`/categories/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        revalidatePath("/dashboard/categories");
        revalidatePath("/services");
        revalidatePath("/");

        return {
            success: true,
            message: response.message || "تم التعديل بنجاح",
            category: response.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err?.response?.data?.message || err?.message || "حدث خطأ أثناء التعديل",
        };
    }
}

export async function getCategoriesAction(queryString = "") {
    try {
        const response = await authApi(`/categories?${queryString}`, {
            method: "GET",
        });

        return {
            success: true,
            data: response.data, // حسب شكل الرد في الـ Backend (documents / categories)
            meta: response.meta || null,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل جلب التصنيفات",
        };
    }
}

export async function deleteCategoryAction(id) {
    try {
        const response = await authApi(`/categories/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/categories");
        revalidatePath("/services");
        revalidatePath("/");

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل حذف المستخدم",
        };
    }
}