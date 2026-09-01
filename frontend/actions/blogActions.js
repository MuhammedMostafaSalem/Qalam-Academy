"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Blog Posts
export async function getBlogsAction(queryString = "") {
    try {
        const response = await authApi(`/blogs?${queryString}`, {
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
            message: error?.message || "فشل جلب المقالات",
            data: [],
            meta: null,
        };
    }
}

// Get Blog Post by ID
export async function getBlogByIdAction(id) {
    try {
        const response = await authApi(`/blogs/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل المقال",
            data: null,
        };
    }
}

// Create Blog Post
export async function createBlogAction(prevState, formData) {
    try {
        const body = new FormData();

        body.append("title.ar", formData.get("titleAr") || "");
        body.append("title.en", formData.get("titleEn") || "");
        body.append("excerpt.ar", formData.get("excerptAr") || "");
        body.append("excerpt.en", formData.get("excerptEn") || "");
        body.append("content.ar", formData.get("contentAr") || "");
        body.append("content.en", formData.get("contentEn") || "");

        const category = formData.get("category");
        if (category) body.append("category", category);

        const tags = formData.get("tags");
        if (tags) body.append("tags", tags);

        const isPublished = formData.get("isPublished");
        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished);
        }

        const featuredImage = formData.get("featuredImage");
        if (featuredImage instanceof File && featuredImage.size > 0) {
            body.append("featuredImage", featuredImage);
        }

        const response = await authApi("/blogs", {
            method: "POST",
            body,
        });

        revalidatePath("/dashboard/blog");
        revalidatePath("/blog");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء المقال بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إنشاء المقال",
            errors: error?.errors || null,
        };
    }
}

// Update Blog Post
export async function updateBlogAction(id, prevState, formData) {
    try {
        const body = new FormData();

        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        if (titleAr) body.append("title.ar", titleAr);
        if (titleEn) body.append("title.en", titleEn);

        const excerptAr = formData.get("excerptAr");
        const excerptEn = formData.get("excerptEn");
        if (excerptAr) body.append("excerpt.ar", excerptAr);
        if (excerptEn) body.append("excerpt.en", excerptEn);

        const contentAr = formData.get("contentAr");
        const contentEn = formData.get("contentEn");
        if (contentAr) body.append("content.ar", contentAr);
        if (contentEn) body.append("content.en", contentEn);

        const category = formData.get("category");
        if (category) body.append("category", category);

        const tags = formData.get("tags");
        if (tags) body.append("tags", tags);

        const isPublished = formData.get("isPublished");
        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished);
        }

        const featuredImage = formData.get("featuredImage");
        if (featuredImage instanceof File && featuredImage.size > 0) {
            body.append("featuredImage", featuredImage);
        }

        const response = await authApi(`/blogs/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/blog");
        revalidatePath("/blog");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث المقال بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث المقال",
            errors: error?.errors || null,
        };
    }
}

// Update a single blog field (used by inline dashboard controls)
export async function updateBlogFieldAction(id, updateData) {
    try {
        const response = await authApi(`/blogs/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        revalidatePath("/dashboard/blog");
        revalidatePath("/blog");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تعديل المقال بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تعديل المقال",
            errors: error?.errors || null,
        };
    }
}

// Delete Blog Post
export async function deleteBlogAction(id) {
    try {
        await authApi(`/blogs/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/blog");
        revalidatePath("/blog");

        return {
            success: true,
            message: "تم حذف المقال بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف المقال",
        };
    }
}
