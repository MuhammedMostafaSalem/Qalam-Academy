"use server";

import { authApi, clearAuthCookies, setAccessTokenCookie, setSessionExpirationCookie } from "@/services/authService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api` || "http://localhost:5000/api";

// 1. Signup Action
export async function signupAction(prevState, formData) {
    try {
        const rawData = Object.fromEntries(formData.entries());

        const response = await authApi("/auth/signup", {
            method: "POST",
            body: JSON.stringify(rawData),
        });

        return {
            success: true,
            message: response.message,
            email: rawData.email,
            fieldErrors: {}
        };
    } catch (error) {
        // لو الـ Backend بيرجع الأخطاء في شكل معين، تقدر تظبطها هنا
        // كمثال، لو الـ error جاي ومعاه تفاصيل للحقول:
        return {
            success: false,
            message: error.message || "حدث خطأ ما أثناء إنشاء الحساب",
            fieldErrors: error.errors || {} // لو الـ backend بيبعت الأخطاء كـ object
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

        // Login Failed
        if (!res.ok) {
            const error = new Error(
                response.message || "بيانات الدخول غير صحيحة"
            );

            error.errors = response.errors || {};

            throw error;
        }

        // Save Refresh Token
        // التقاط الـ refreshToken الذي يتم تعيينه عبر headers الباك إند (Set-Cookie) وحفظه في Next.js cookies
        const setCookieHeader = res.headers.get("set-cookie");
        const cookieStore = await cookies();

        if (setCookieHeader) {
            const refreshTokenMatch = setCookieHeader.match(
                /refreshToken=([^;]+)/
            );

            if (refreshTokenMatch) {
                const refreshToken = refreshTokenMatch[1];

                cookieStore.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 90 * 24 * 60 * 60, // 90 days
                });
            }
        }

        // Save Access Token
        // التقاط الـ accessToken القادم في الـ Response Body وحفظه في كوكيز المتصفح
        if (response.data?.accessToken) {
            await setAccessTokenCookie(response.data.accessToken);
        }

        // Set Client Session Timer
        const sessionExpiresAt = await setSessionExpirationCookie();

        return {
            success: true,
            message: response.message || "تم تسجيل الدخول بنجاح",
            data: response.data,
            sessionExpiresAt,
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
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

// 8. Logout Action
export async function logoutAction() {
    try {
        await authApi("/auth/logout", {
            method: "POST",
        });
    } catch (error) {
        console.error(
            "Backend logout failed:",
            error
        );
    }

    // Always clear cookies locally
    await clearAuthCookies();

    return {
        success: true,

        message:
            "تم تسجيل الخروج بنجاح",
    };
}