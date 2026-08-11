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
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const subject = formData.get("subject");
        const message = formData.get("message");

        const response = await authApi("/contact", {
            method: "POST",
            body: JSON.stringify({ name, email, phone, subject, message }),
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
