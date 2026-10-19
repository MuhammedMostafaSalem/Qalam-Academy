
"use server";

import { authApi } from "@/services/authService";

// ========================================
// Get Course Details by Slug
// ========================================

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

// ========================================
// Get All Lessons for a Course
// ========================================

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

// ========================================
// Get Lesson by ID
// ========================================

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

// ========================================
// Create Lesson (Admin / Instructor)
// ========================================

export async function createLessonAction(prevState, formData) {
    try {
        const body = new FormData();

        // ----------------------------
        // Title
        // ----------------------------

        body.append("title[ar]", formData.get("titleAr") || "");
        body.append("title[en]", formData.get("titleEn") || "");

        // ----------------------------
        // Description
        // ----------------------------

        body.append(
            "description[ar]",
            formData.get("descriptionAr") || ""
        );

        body.append(
            "description[en]",
            formData.get("descriptionEn") || ""
        );

        // ----------------------------
        // Content type
        // ----------------------------

        const contentType = formData.get("contentType") || "video";

        body.append("contentType", contentType);

        // ----------------------------
        // Text content
        // ----------------------------

        const contentAr = formData.get("contentAr") ?? "";
        const contentEn = formData.get("contentEn") ?? "";

        // Append both languages, even if empty
        body.append("content[ar]", contentAr);
        body.append("content[en]", contentEn);

        // ----------------------------
        // Learning Points
        // ----------------------------

        const learningPointsAr = formData.getAll("learningPointsAr");
        const learningPointsEn = formData.getAll("learningPointsEn");

        const learningPointsCount = Math.max(
            learningPointsAr.length,
            learningPointsEn.length,
        );

        for (let index = 0; index < learningPointsCount; index++) {
            const ar = String(learningPointsAr[index] || "").trim();
            const en = String(learningPointsEn[index] || "").trim();

            // Skip completely empty rows.
            if (!ar && !en) continue;

            body.append(`learningPoints[${index}][ar]`, ar);
            body.append(`learningPoints[${index}][en]`, en);
        }

        // ----------------------------
        // Course
        // ----------------------------

        const course = formData.get("course");

        if (course) {
            body.append("course", course);
        }

        // ----------------------------
        // Duration
        // ----------------------------

        const duration = formData.get("duration");

        if (duration !== null && duration !== "") {
            body.append("duration", duration);
        }

        // ----------------------------
        // Preview
        // ----------------------------

        const isPreview = formData.get("isPreview");

        if (isPreview !== null && isPreview !== undefined) {
            body.append("isPreview", isPreview);
        }

        // ----------------------------
        // Published
        // ----------------------------

        const isPublished = formData.get("isPublished");

        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished);
        }

        // ----------------------------
        // Sort order
        // ----------------------------

        const sortOrder = formData.get("sortOrder");

        if (sortOrder !== null && sortOrder !== "") {
            body.append("sortOrder", sortOrder);
        }

        // ----------------------------
        // Video file
        // ----------------------------

        const videoFile = formData.get("video");

        if (videoFile instanceof File && videoFile.size > 0) {
            body.append("video", videoFile);
        }

        // ----------------------------
        // YouTube URL
        // ----------------------------

        const videoYoutube = formData.get("videoYoutube");

        if (videoYoutube) {
            body.append("videoYoutube", videoYoutube);
        }

        // ----------------------------
        // Thumbnail
        // ----------------------------

        const thumbnail = formData.get("thumbnail");

        if (thumbnail instanceof File && thumbnail.size > 0) {
            body.append("thumbnail", thumbnail);
        }

        // ----------------------------
        // Attachment
        // ----------------------------

        const attachment = formData.get("attachment");

        if (attachment instanceof File && attachment.size > 0) {
            body.append("attachment", attachment);
        }

        // ----------------------------
        // API request
        // ----------------------------

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

// ========================================
// Update Lesson (Admin / Instructor)
// ========================================

export async function updateLessonAction(id, prevState, formData) {
    try {
        const body = new FormData();

        // ----------------------------
        // Content type
        // ----------------------------

        const contentType = formData.get("contentType");

        if (contentType !== null && contentType !== "") {
            body.append("contentType", contentType);
        }

        // ----------------------------
        // Learning Points
        // ----------------------------

        const learningPointsSubmitted =
            formData.get("learningPointsSubmitted") === "true";

        if (learningPointsSubmitted) {
            const learningPointsAr =
                formData.getAll("learningPointsAr");

            const learningPointsEn =
                formData.getAll("learningPointsEn");

            const learningPointsCount = Math.max(
                learningPointsAr.length,
                learningPointsEn.length
            );

            if (learningPointsCount === 0) {
                body.append("clearLearningPoints", "true");
            } else {
                for (let index = 0; index < learningPointsCount; index++) {
                    const ar = String(
                        learningPointsAr[index] || ""
                    ).trim();

                    const en = String(
                        learningPointsEn[index] || ""
                    ).trim();

                    // تجاهل النقطة الفارغة بالكامل
                    if (!ar && !en) continue;

                    body.append(
                        `learningPoints[${index}][ar]`,
                        ar
                    );

                    body.append(
                        `learningPoints[${index}][en]`,
                        en
                    );
                }
            }
        }

        // ----------------------------
        // Title
        // ----------------------------

        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");

        // Check against null, not truthiness,
        // so an intentionally empty value can be sent.
        if (titleAr !== null) {
            body.append("title[ar]", titleAr);
        }

        if (titleEn !== null) {
            body.append("title[en]", titleEn);
        }

        // ----------------------------
        // Description
        // ----------------------------

        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");

        if (descriptionAr !== null) {
            body.append("description[ar]", descriptionAr);
        }

        if (descriptionEn !== null) {
            body.append("description[en]", descriptionEn);
        }

        // ----------------------------
        // Text content
        // ----------------------------

        const contentAr = formData.get("contentAr");
        const contentEn = formData.get("contentEn");

        if (contentAr !== null) {
            body.append("content[ar]", contentAr);
        }

        if (contentEn !== null) {
            body.append("content[en]", contentEn);
        }

        // ----------------------------
        // Duration
        // ----------------------------

        const duration = formData.get("duration");

        if (duration !== null && duration !== "") {
            body.append("duration", duration);
        }

        // ----------------------------
        // Preview
        // ----------------------------

        const isPreview = formData.get("isPreview");

        if (isPreview !== null && isPreview !== undefined) {
            body.append("isPreview", isPreview);
        }

        // ----------------------------
        // Published
        // ----------------------------

        const isPublished = formData.get("isPublished");

        if (isPublished !== null && isPublished !== undefined) {
            body.append("isPublished", isPublished);
        }

        // ----------------------------
        // Sort order
        // ----------------------------

        const sortOrder = formData.get("sortOrder");

        if (sortOrder !== null && sortOrder !== "") {
            body.append("sortOrder", sortOrder);
        }

        // ----------------------------
        // Video file
        // ----------------------------

        const videoFile = formData.get("video");

        if (videoFile instanceof File && videoFile.size > 0) {
            body.append("video", videoFile);
        }

        // ----------------------------
        // YouTube URL
        // ----------------------------

        const videoYoutube = formData.get("videoYoutube");

        if (videoYoutube !== null) {
            body.append("videoYoutube", videoYoutube);
        }

        // ----------------------------
        // Thumbnail
        // ----------------------------

        const thumbnail = formData.get("thumbnail");

        if (thumbnail instanceof File && thumbnail.size > 0) {
            body.append("thumbnail", thumbnail);
        }

        // ----------------------------
        // Attachment
        // ----------------------------

        const attachment = formData.get("attachment");

        if (attachment instanceof File && attachment.size > 0) {
            body.append("attachment", attachment);
        }

        // ----------------------------
        // API request
        // ----------------------------

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

// ========================================
// Delete Lesson (Admin / Instructor)
// ========================================

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
