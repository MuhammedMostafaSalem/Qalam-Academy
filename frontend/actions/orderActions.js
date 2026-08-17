"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Orders (Admin)
export async function getOrdersAction(queryString = "") {
    try {
        const response = await authApi(`/orders?${queryString}`, {
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
            message: error?.message || "فشل جلب الطلبات",
            data: [],
            meta: null,
        };
    }
}

// Get Order by ID
export async function getOrderByIdAction(id) {
    try {
        const response = await authApi(`/orders/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الطلب",
            data: null,
        };
    }
}

// Cancel Order
export async function cancelOrderAction(id) {
    try {
        const response = await authApi(`/orders/${id}/cancel`, {
            method: "PATCH",
        });

        revalidatePath("/dashboard/orders");
        revalidatePath("/user/orders");

        return {
            success: true,
            message: response.message || "تم إلغاء الطلب بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إلغاء الطلب",
        };
    }
}

// Create Cash Order
export async function createCashOrderAction(cartId, shippingAddress = {}) {
    try {
        const response = await authApi(`/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
        });

        revalidatePath("/user/orders");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء الطلب بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إنشاء الطلب",
        };
    }
}

// Create Paymob Checkout
export async function checkoutPaymobAction(cartId, paymentType = "card", shippingAddress = {}) {
    try {
        const response = await authApi(`/orders/checkout-paymob/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ paymentType, shippingAddress }),
        });

        const redirect_url = response?.redirect_url || response?.data?.redirect_url;
        const client_secret = response?.client_secret || response?.data?.client_secret;
        const orderId = response?.orderId || response?.data?.orderId;

        return {
            success: true,
            data: response?.data || response,
            redirect_url,
            client_secret,
            orderId,
            message: response?.message || "تم إنشاء رابط الدفع",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إنشاء رابط الدفع",
        };
    }
}

// Create PayPal Checkout
export async function checkoutPaypalAction(cartId, shippingAddress = {}) {
    try {
        const response = await authApi(`/orders/checkout-paypal/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
        });

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء رابط الدفع",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إنشاء رابط الدفع",
        };
    }
}
