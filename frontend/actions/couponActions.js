"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Coupons
export async function getCouponsAction(queryString = "") {
    try {
        const response = await authApi(`/coupons?${queryString}`, {
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
            message: error?.message || "فشل جلب الكوبونات",
            data: [],
            meta: null,
        };
    }
}

// Get Coupon by ID
export async function getCouponByIdAction(id) {
    try {
        const response = await authApi(`/coupons/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الكوبون",
            data: null,
        };
    }
}

// Create Coupon
export async function createCouponAction(prevState, formData) {
    try {
        const name = formData.get("name");
        const discount = formData.get("discount");
        const expire = formData.get("expire");

        const response = await authApi("/coupons", {
            method: "POST",
            body: JSON.stringify({ name, discount: Number(discount), expire }),
        });

        revalidatePath("/dashboard/coupons");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء الكوبون بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إنشاء الكوبون",
            errors: error?.errors || null,
        };
    }
}

// Update Coupon
export async function updateCouponAction(id, updateData) {
    try {
        const response = await authApi(`/coupons/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        revalidatePath("/dashboard/coupons");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الكوبون بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث الكوبون",
        };
    }
}

// Delete Coupon
export async function deleteCouponAction(id) {
    try {
        await authApi(`/coupons/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/coupons");

        return {
            success: true,
            message: "تم حذف الكوبون بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف الكوبون",
        };
    }
}
