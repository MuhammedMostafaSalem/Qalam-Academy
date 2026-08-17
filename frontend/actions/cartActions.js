"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Cart
export async function getCartAction() {
    try {
        const response = await authApi("/cart", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب السلة",
            data: null,
        };
    }
}

// Add Item to Cart (itemType: "Course" | "Product")
export async function addToCartAction(itemId, itemType = "Course", color = "") {
    try {
        const response = await authApi("/cart", {
            method: "POST",
            body: JSON.stringify({ itemId, itemType, color }),
        });

        revalidatePath("/");
        revalidatePath("/cart");

        return {
            success: true,
            data: response.data,
            meta: response.meta,
            message: response.message || "تمت الإضافة إلى السلة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل الإضافة إلى السلة",
        };
    }
}

// Update Cart Item Quantity
export async function updateCartItemAction(cartItemId, count) {
    try {
        const response = await authApi(`/cart/${cartItemId}`, {
            method: "PUT",
            body: JSON.stringify({ count }),
        });

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الكمية",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث الكمية",
        };
    }
}

// Remove Item from Cart
export async function removeFromCartAction(cartItemId) {
    try {
        const response = await authApi(`/cart/${cartItemId}`, {
            method: "DELETE",
        });

        return {
            success: true,
            message: response.message || "تم حذف العنصر من السلة",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف العنصر من السلة",
        };
    }
}

// Clear Cart
export async function clearCartAction() {
    try {
        const response = await authApi("/cart", {
            method: "DELETE",
        });

        return {
            success: true,
            message: response.message || "تم تفريغ السلة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تفريغ السلة",
        };
    }
}

// Apply Coupon
export async function applyCouponAction(couponName) {
    try {
        const response = await authApi("/cart/apply-coupon", {
            method: "PATCH",
            body: JSON.stringify({ couponName }),
        });

        revalidatePath("/cart");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تطبيق الكوبون بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "الكوبون غير صالح أو منتهي الصلاحية",
        };
    }
}

// Remove Coupon
export async function removeCouponAction() {
    try {
        const response = await authApi("/cart/remove-coupon", {
            method: "DELETE",
        });

        revalidatePath("/cart");

        return {
            success: true,
            message: response.message || "تم إزالة الكوبون",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إزالة الكوبون",
        };
    }
}
