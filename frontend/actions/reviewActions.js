"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Reviews (Public)
export async function getReviewsAction(queryString = "") {
    try {
        const response = await authApi(`/reviews?${queryString}`, {
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
            message: error?.message || "فشل جلب التقييمات",
            data: [],
            meta: null,
        };
    }
}

// Create Review (Student)
export async function createReviewAction(prevState, formData) {
    try {
        const courseId = formData.get("courseId");
        const rating = formData.get("rating");
        const comment = formData.get("comment");

        const response = await authApi("/reviews", {
            method: "POST",
            body: JSON.stringify({
                course: courseId,
                rating: Number(rating),
                comment,
            }),
        });

        revalidatePath(`/courses`);

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إرسال تقييمك بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إرسال التقييم",
            errors: error?.errors || null,
        };
    }
}

// Update Review (Student/Admin)
export async function updateReviewAction(id, updateData) {
    try {
        const response = await authApi(`/reviews/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث التقييم بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث التقييم",
        };
    }
}

// Delete Review (Student/Admin)
export async function deleteReviewAction(id) {
    try {
        await authApi(`/reviews/${id}`, {
            method: "DELETE",
        });

        return {
            success: true,
            message: "تم حذف التقييم بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف التقييم",
        };
    }
}
