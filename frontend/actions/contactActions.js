"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Contact Messages (Admin)
export async function getMessagesAction(queryString = "") {
    try {
        const response = await authApi(`/contact?${queryString}`, {
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
            message: error?.message || "فشل جلب الرسائل",
            data: [],
            meta: null,
        };
    }
}

// Get Message by ID (Admin)
export async function getMessageByIdAction(id) {
    try {
        const response = await authApi(`/contact/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل الرسالة",
            data: null,
        };
    }
}

// Submit Contact Form (Public)
export async function submitContactAction(prevState, formData) {
    try {
        const fullName = (formData.get("fullName") || formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const phone = (formData.get("phone") || "").toString().trim();
        const subject = (formData.get("subject") || "").toString().trim();
        const message = (formData.get("message") || "").toString().trim();

        const response = await authApi("/contact", {
            method: "POST",
            body: JSON.stringify({ fullName, email, phone, subject, message }),
        });

        return {
            success: true,
            message: response.message || "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل إرسال الرسالة، حاول مرة أخرى",
            fieldErrors: error?.errors || {},
        };
    }
}

// Delete Message (Admin)
export async function deleteMessageAction(id) {
    try {
        await authApi(`/contact/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/messages");

        return {
            success: true,
            message: "تم حذف الرسالة بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف الرسالة",
        };
    }
}
