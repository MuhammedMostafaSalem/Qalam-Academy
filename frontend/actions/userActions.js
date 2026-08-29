"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";
import { getThemeModeAction, setThemeModeAction } from "@/actions/themeActions";

export async function getUsersAction(queryString = "") {
    try {
        const response = await authApi(`/users/admin?${queryString}`, {
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
            message: error.message || "فشل جلب المستخدمين",
        };
    }
}

export async function getStudentsAction(queryString = "") {
    try {
        const response = await authApi(`/users?role=student&${queryString}`, {
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
            message: error.message || "فشل جلب الطلاب",
        };
    }
}

export async function getInstructorsAction(queryString = "") {
    try {
        const response = await authApi(`/users?role=instructor&${queryString}`, {
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
            message: error.message || "فشل جلب المدربين",
            data: [],
        };
    }
}

export async function getUserByIdAction(userId) {
    try {
        const response = await authApi(`/users/${userId}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل جلب بيانات المستخدم",
        };
    }
}

export async function updateUserByAdminAction(userId, updateData) {
    try {
        const response = await authApi(`/users/${userId}/admin`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        revalidatePath("/dashboard/users");
        revalidatePath("/dashboard/students");

        return {
            success: true,
            message: response.message || "تم التعديل بنجاح",
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "حدث خطأ أثناء التعديل",
        };
    }
}

export async function deleteUserAction(userId) {
    try {
        await authApi(`/users/${userId}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/users");
        revalidatePath("/dashboard/students");

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

export async function updateProfileAction(userId, formData) {
    try {
        const body = new FormData();

        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const phone = formData.get("phone");
        const bio = formData.get("bio");
        const country = formData.get("country");
        const city = formData.get("city");
        const address = formData.get("address");

        if (firstName) body.append("firstName", firstName);
        if (lastName) body.append("lastName", lastName);
        if (phone) body.append("phone", phone);
        if (bio !== null) body.append("bio", bio);
        if (country) body.append("country", country);
        if (city) body.append("city", city);
        if (address) body.append("address", address);

        const avatar = formData.get("avatar");
        if (avatar instanceof File && avatar.size > 0) {
            body.append("avatar", avatar);
        }

        const response = await authApi(`/users/${userId}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/profile");
        revalidatePath("/user/profile");

        return {
            success: true,
            message: response.message || "تم تحديث الملف الشخصي بنجاح",
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل تحديث الملف الشخصي",
            errors: error.errors || null,
        };
    }
}

export async function changePasswordAction(userId, formData) {
    try {
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");
        const confirmPassword = formData.get("confirmPassword");

        const response = await authApi(`/users/${userId}/change-password`, {
            method: "PUT",
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword,
            }),
        });

        return {
            success: true,
            message: response.message || "تم تغيير كلمة المرور بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل تغيير كلمة المرور",
        };
    }
}

export async function getThemeAction() {
    return getThemeModeAction();
}

export async function toggleThemeAction(themeMode) {
    return setThemeModeAction(themeMode);
}
