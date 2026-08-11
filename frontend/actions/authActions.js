"use server";

import {
    authApi,
} from "@/services/authService";
import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api` || "http://localhost:5000/api";

// 1. Signup Action
export async function signupAction(prevState, formData) {
    try {
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const password = formData.get("password");
        const country = formData.get("country");
        const city = formData.get("city");
        const address = formData.get("address");

        const response = await authApi("/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                password,
                country,
                city,
                address,
            }),
        });

        return {
            success: true,
            message: response.message,
            email,
            fieldErrors: {}
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "حدث خطأ ما أثناء إنشاء الحساب",
            fieldErrors: error.errors || {}
        };
    }
}

// 2. Verify OTP Action (للتفعيل أو نسيت كلمة المرور)
export async function verifyOtpAction(prevState, formData) {
    try {
        const email = formData.get("email");
        const otp = formData.get("otp");
        const purpose = formData.get("purpose");

        const response = await authApi("/auth/verify-otp", {
            method: "POST",
            body: JSON.stringify({
                email,
                otp,
                purpose,
            }),
        });

        return {
            success: true,
            message: response.message,
            data: response.data,
            fieldErrors: {},
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "الكود غير صحيح أو انتهت صلاحيته",
            fieldErrors: error.errors || {},
        };
    }
}

// 3. Resend OTP Action
export async function resendOtpAction(prevState, formData) {
    try {
        const rawData = Object.fromEntries(formData.entries());

        const response = await authApi("/auth/resend-otp", {
            method: "POST",
            body: JSON.stringify(rawData),
        });

        return {
            success: true,
            message: response.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل إرسال الكود، حاول مرة أخرى"
        };
    }
}

// 4. Login Action
export async function loginAction(prevState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),

            cache: "no-store",
        });

        const response = await res.json();

        if (!res.ok) {
            const error = new Error(response.message || "بيانات الدخول غير صحيحة");

            error.statusCode = res.status;
            error.errors = response.errors || {};

            throw error;
        }

        // Get Qalam_Token from backend Set - Cookie
        const setCookie = res.headers.get("set-cookie");

        const match = setCookie?.match(/Qalam_Token=([^;]+)/);

        const token = match?.[1];

        if (!token) {
            throw new Error("لم يتم استلام authentication cookie من السيرفر");
        }

        const sessionExpiresAt = response.data.sessionExpiresAt;

        const maxAge = Math.max(0, Math.floor((sessionExpiresAt - Date.now()) / 1000));
        
        // Store token in Next.js HttpOnly Cookie
        const cookieStore = await cookies();
        cookieStore.set("Qalam_Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge,
        });

        return {
            success: true,
            message: response.message || "تم تسجيل الدخول بنجاح",
            data: response.data,
            sessionExpiresAt: response.data.sessionExpiresAt,
            fieldErrors: {},
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "بيانات الدخول غير صحيحة",
            fieldErrors: error.errors || {}
        };
    }
}

// 5. Forgot Password Action
export async function forgotPasswordAction(prevState, formData) {
    try {
        const email = formData.get("email");

        const response = await authApi("/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({
                email
            }),
        });

        return {
            success: true,
            message: response.message,
            email,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل إرسال رمز التحقق، تأكد من البريد الإلكتروني",
            fieldErrors: error.errors || {}
        };
    }
}

// 6. Reset Password Action
export async function resetPasswordAction(prevState, formData) {
    try {
        const token = formData.get("token");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        const response = await authApi("/auth/reset-password", {
            method: "PATCH",
            body: JSON.stringify({
                token,
                password,
                confirmPassword
            }),
        });

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "فشل إعادة تعيين كلمة المرور",
            fieldErrors: error.errors || {}
        };
    }
}

// 7. Get Current User Action
export async function getCurrentUserAction() {
    try {
        const response = await authApi("/users/me", {
            method: "GET",
        });

        return {
            success: true,
            data: response.data,
            authExpired: false,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: error.statusCode,
            message: error.message,
            authExpired: error.authExpired || false,
        };
    }
}

// 8. Logout Action
export async function logoutAction() {
    try {
        // await authApi("/auth/logout", {
        //     method: "POST",
        // });
        const cookieStore = await cookies();

        const token = cookieStore.get("Qalam_Token")?.value;

        await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: token ?
                {
                    Cookie: `Qalam_Token=${token}`,
                }
                : {},
            cache: "no-store"
        });
    } catch (error) {
        console.error("Backend logout failed:", error);
    }

    // Always remove Next.js authentication cookie
    const cookieStore = await cookies();
    cookieStore.delete("Qalam_Token");

    return {
        success: true,
        message: "تم تسجيل الخروج بنجاح",
    };
}