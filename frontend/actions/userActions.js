"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// جلب المستخدمين مع دعم البحث والفلترة (Pagination, Search, Role) بواسطة الادمن
export async function getUsersAction(queryString = "") {
    try {
        const response = await authApi(`/users/admin?${queryString}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data, // حسب شكل الرد في الـ Backend (documents / users)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل جلب المستخدمين",
        };
    }
}

// تعديل الصلاحية (role) أو الحالة (isActive) بواسطة الأدمن
export async function updateUserByAdminAction(userId, updateData) {
    try {
        const response = await authApi(`/users/${userId}/admin`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        // تحديث الكاش لصفحة المستخدمين في لوحة التحكم فوراً
        revalidatePath("/dashboard/users"); // عدل المسار حسب صفحتك

        return {
            success: true,
            message: response.message || "تم التعديل بنجاح",
            data: response.data?.user,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message || "حدث خطأ أثناء التعديل",
        };
    }
}

// حذف المستخدم
export async function deleteUserAction(userId) {
    try {
        await authApi(`/users/${userId}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/users");

        return {
            success: true,
            message: "تم حذف المستخدم بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل حذف المستخدم",
        };
    }
}