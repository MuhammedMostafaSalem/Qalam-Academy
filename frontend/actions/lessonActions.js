"use server";

import { authApi } from "@/services/authService";

// Get Course Details by Slug (Public - but requires auth for enrollment status)
export async function getCourseDetailsAction(slug) {
    try {
        const response = await authApi(`/course/${slug}/details`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الكورس",
            data: null,
        };
    }
}

// Get All Lessons for a Course
export async function getLessonsAction(queryString = "") {
    try {
        const response = await authApi(`/lessons?${queryString}`, {
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
            message: error?.message || "فشل جلب الدروس",
            data: [],
            meta: null,
        };
    }
}

// Get Lesson by ID
export async function getLessonByIdAction(id) {
    try {
        const response = await authApi(`/lessons/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الدرس",
            data: null,
        };
    }
}

// Create Lesson (Admin/Instructor)
export async function createLessonAction(prevState, formData) {
    try {
        const body = new FormData();

        body.append("title[ar]", formData.get("titleAr") || "");
        body.append("title[en]", formData.get("titleEn") || "");
        body.append("description[ar]", formData.get("descriptionAr") || "");
        body.append("description[en]", formData.get("descriptionEn") || "");

        const course = formData.get("course");
        if (course) body.append("course", course);

        const duration = formData.get("duration");
        if (duration) body.append("duration", duration);

        const isPreview = formData.get("isPreview");
        if (isPreview !== null && isPreview !== undefined) {
            body.append("isPreview", isPreview);
        }

        const isPublished = formData.get("isPublished");
        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished);
        }

        const sortOrder = formData.get("sortOrder");
        if (sortOrder) body.append("sortOrder", sortOrder);

        const video = formData.get("video");
        if (video instanceof File && video.size > 0) {
            body.append("video", video);
        }

        const response = await authApi("/lessons", {
            method: "POST",
            body,
        });

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء الدرس بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إنشاء الدرس",
            errors: error?.errors || null,
        };
    }
}

// Update Lesson (Admin/Instructor)
export async function updateLessonAction(id, prevState, formData) {
    try {
        const body = new FormData();

        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        if (titleAr) body.append("title[ar]", titleAr);
        if (titleEn) body.append("title[en]", titleEn);

        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");
        if (descriptionAr) body.append("description[ar]", descriptionAr);
        if (descriptionEn) body.append("description[en]", descriptionEn);

        const duration = formData.get("duration");
        if (duration) body.append("duration", duration);

        const isPreview = formData.get("isPreview");
        if (isPreview !== null && isPreview !== undefined) {
            body.append("isPreview", isPreview);
        }

        const isPublished = formData.get("isPublished");
        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished);
        }

        const sortOrder = formData.get("sortOrder");
        if (sortOrder) body.append("sortOrder", sortOrder);

        const video = formData.get("video");
        if (video instanceof File && video.size > 0) {
            body.append("video", video);
        }

        const response = await authApi(`/lessons/${id}`, {
            method: "PATCH",
            body,
        });

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الدرس بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث الدرس",
            errors: error?.errors || null,
        };
    }
}

// Delete Lesson (Admin/Instructor)
export async function deleteLessonAction(id) {
    try {
        await authApi(`/lessons/${id}`, {
            method: "DELETE",
        });

        return {
            success: true,
            message: "تم حذف الدرس بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف الدرس",
        };
    }
}
