"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Continue Watching (Student)
export async function getContinueWatchingAction() {
    try {
        const response = await authApi("/progress/continue-watching", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب بيانات المتابعة",
            data: null,
        };
    }
}

// Get Course Progress (Student)
export async function getCourseProgressAction(courseId) {
    try {
        const response = await authApi(`/progress/course/${courseId}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تقدم الكورس",
            data: null,
        };
    }
}

// Update Lesson Progress (Student)
export async function updateProgressAction(lessonId, isCompleted = true) {
    try {
        const response = await authApi("/progress", {
            method: "POST",
            body: JSON.stringify({ lesson: lessonId, isCompleted }),
        });

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث التقدم",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث التقدم",
        };
    }
}
