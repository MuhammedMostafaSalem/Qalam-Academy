"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Create Course
export const createCourseAction = async (prevState, formData) => {
    try {
        const body = new FormData();

        // title (ar/en)
        body.append("title.ar", formData.get("titleAr"));
        body.append("title.en", formData.get("titleEn"));

        // description (ar/en)
        body.append("description.ar", formData.get("descriptionAr"));
        body.append("description.en", formData.get("descriptionEn"));

        // category
        body.append("category", formData.get("category"));

        // instructor
        body.append("instructor", formData.get("instructor"));

        // level
        body.append("level", formData.get("level"));

        // language
        body.append("language", formData.get("language"));

        // price
        body.append("price", formData.get("price"));

        // discountPrice
        const discountPrice = formData.get("discountPrice");
        if (discountPrice) {
            body.append("discountPrice", discountPrice);
        }

        // duration
        body.append("duration", formData.get("duration"));

        // requirements
        body.append("requirements", formData.get("requirements"));

        // objectives
        body.append("objectives", formData.get("objectives"));

        // tags
        body.append("tags", formData.get("tags"));

        // thumbnail
        const thumbnail = formData.get("thumbnail");
        if (thumbnail instanceof File && thumbnail.size > 0) {
            body.append("thumbnail", thumbnail);
        }

        // trailerVideo
        const trailerVideo = formData.get("trailerVideo");
        if (trailerVideo instanceof File && trailerVideo.size > 0) {
            body.append("trailerVideo", trailerVideo);
        }

        const response = await authApi("/courses", {
            method: "POST",
            body,
        });
        
        revalidatePath("/dashboard/courses");
        revalidatePath("/courses");

        return {
            success: true,
            course: response.data,
            message: response.message || "تم إنشاء الكورس بنجاح",
            errors: null,
        };
    } catch (error) {
        console.error("Create course error:", error);

        return {
            success: false,
            course: null,
            message: error?.message || "فشل إنشاء الكورس",
            errors: error?.errors || null,
        };
    }
};

// Update Course
export const updateCourseAction = async (id, prevState, formData) => {
    try {
        const body = new FormData();

        // title (ar/en)
        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        if (titleAr) body.append("title.ar", titleAr);
        if (titleEn) body.append("title.en", titleEn);

        // description (ar/en)
        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");
        if (descriptionAr) body.append("description.ar", descriptionAr);
        if (descriptionEn) body.append("description.en", descriptionEn);

        // category
        const category = formData.get("category");
        if (category) body.append("category", category);

        // instructor
        const instructor = formData.get("instructor");
        if (instructor) body.append("instructor", instructor);

        // level
        const level = formData.get("level");
        if (level) body.append("level", level);

        // language
        const language = formData.get("language");
        if (language) body.append("language", language);

        // price
        const price = formData.get("price");
        if (price) body.append("price", price);

        // discountPrice
        const discountPrice = formData.get("discountPrice");
        if (discountPrice) body.append("discountPrice", discountPrice);

        // duration
        const duration = formData.get("duration");
        if (duration) body.append("duration", duration);

        // requirements
        const requirements = formData.get("requirements");
        if (requirements) body.append("requirements", requirements);

        // objectives
        const objectives = formData.get("objectives");
        if (objectives) body.append("objectives", objectives);

        // tags
        const tags = formData.get("tags");
        if (tags) body.append("tags", tags);

        // isPublished
        const isPublished = formData.get("isPublished");
        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished === "true" ? "true" : "false");
        }

        // isFeatured
        const isFeatured = formData.get("isFeatured");
        if (isFeatured !== null && isFeatured !== undefined) {
            body.append("isFeatured", isFeatured === "true" ? "true" : "false");
        }

        // thumbnail
        const thumbnail = formData.get("thumbnail");
        const removeThumbnail = formData.get("removeThumbnail");
        if (removeThumbnail === "true") {
            body.append("thumbnail", "");
        } else if (thumbnail instanceof File && thumbnail.size > 0) {
            body.append("thumbnail", thumbnail);
        }

        // trailerVideo
        const trailerVideo = formData.get("trailerVideo");
        const removeTrailer = formData.get("removeTrailer");
        if (removeTrailer === "true") {
            body.append("trailerVideo", "");
        } else if (trailerVideo instanceof File && trailerVideo.size > 0) {
            body.append("trailerVideo", trailerVideo);
        }

        const response = await authApi(`/courses/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/courses");
        revalidatePath(`/dashboard/courses/${id}`);
        revalidatePath("/courses");

        return {
            success: true,
            course: response.data,
            message: response.message || "تم تحديث الكورس بنجاح",
            errors: null,
        };
    } catch (error) {
        console.error("Update course error:", error);

        return {
            success: false,
            course: null,
            message: error?.message || "فشل تحديث الكورس",
            errors: error?.errors || null,
        };
    }
};

// Delete Course
export const deleteCourseAction = async (id) => {
    try {
        const response = await authApi(`/courses/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/courses");
        revalidatePath("/courses");

        return {
            success: true,
            message: response.message || "تم حذف الكورس بنجاح",
        };
    } catch (error) {
        console.error("Delete course error:", error);

        return {
            success: false,
            message: error?.message || "فشل حذف الكورس",
        };
    }
};

// Get All Courses
export async function getCoursesAction(queryString = "") {
    try {
        const response = await authApi(`/courses?${queryString}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
            meta: response.meta,
        };
    } catch (error) {
        console.error("Get courses error:", error);

        return {
            success: false,
            message: error?.message || "فشل جلب الكورسات",
            data: [],
            meta: null,
        };
    }
}

// Get Course by ID
export async function getCourseByIdAction(id) {
    try {
        const response = await authApi(`/courses/${id}`, {
            method: "GET",
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Get course by ID error:", error);

        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الكورس",
            data: null,
        };
    }
}

// Update single course field (e.g. isPublished, isFeatured)
export async function updateCourseFieldAction(id, updateData) {
    try {
        const response = await authApi(`/courses/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        revalidatePath("/dashboard/courses");
        revalidatePath(`/dashboard/courses/${id}`);
        revalidatePath("/courses");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تعديل الكورس بنجاح",
        };
    } catch (error) {
        console.error("Update course field error:", error);

        return {
            success: false,
            message: error?.message || "فشل تعديل الكورس",
            errors: error?.errors || null,
        };
    }
}

