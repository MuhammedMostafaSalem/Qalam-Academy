"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

export async function getWishlistAction() {
    try {
        const response = await authApi("/wishlist/course", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل جلب المفضلة",
        };
    }
}

export async function addToWishlistAction(courseId) {
    try {
        const response = await authApi("/wishlist/course", {
            method: "POST",
            body: JSON.stringify({ courseId }),
        });
        return {
            success: true,
            message: response.message || "تمت الإضافة إلى المفضلة",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل الإضافة إلى المفضلة",
        };
    }
}

export async function removeFromWishlistAction(courseId) {
    try {
        const response = await authApi(`/wishlist/course/${courseId}`, {
            method: "DELETE",
        });

        revalidatePath("/user/wishlist");

        return {
            success: true,
            message: response.message || "تم الحذف من المفضلة",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل الحذف من المفضلة",
        };
    }
}
