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

// Update lesson position/completion (Student). Automatic and manual completion
// both use this endpoint and the same idempotent backend operation.
export async function updateProgressAction({
    lessonId,
    watchedSeconds = 0,
    lastPosition = 0,
    completed = false,
}) {
    try {
        const response = await authApi("/progress", {
            method: "POST",
            body: JSON.stringify({
                lesson: lessonId,
                watchedSeconds: Math.max(0, Number(watchedSeconds) || 0),
                lastPosition: Math.max(0, Number(lastPosition) || 0),
                completed: Boolean(completed),
            }),
        });

        revalidatePath("/courses/[slug]", "page");
        revalidatePath("/courses/[slug]/lesson/[lessonId]", "page");
        revalidatePath("/user/my-courses");

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
