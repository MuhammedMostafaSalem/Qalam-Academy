import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
    : "http://localhost:5000/api";

export async function authApi(endpoint, options = {}) {
    const cookieStore = await cookies();

    const token = cookieStore.get("Qalam_Token")?.value;

    const headers = new Headers(options.headers);

    // if (!headers.has("Content-Type")) {
    //     headers.set("Content-Type", "application/json");
    // }
    if (
        options.body &&
        typeof options.body === "string" &&
        !headers.has("Content-Type")
    ) {
        headers.set("Content-Type", "application/json");
    }

    // Set default language to Arabic
    if (!headers.has("Accept-Language")) {
        headers.set("Accept-Language", "ar");
    }

    // Forward authentication cookie to backend
    if (token) {
        headers.set("Cookie", `Qalam_Token=${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        cache: "no-store",
    });

    const data = await response.json();

    // Authentication failed / session expired
    if (response.status === 401) {
        // Remove authentication cookie from Next.js
        cookieStore.delete("Qalam_Token");

        const error = new Error(data.message || "انتهت جلسة تسجيل الدخول");

        error.statusCode = 401;
        error.authExpired = true;
        error.errors = data.errors || {};
        
        throw error;
    }

    // Other API errors
    if (!response.ok) {
        const error = new Error(data.message || "حدث خطأ ما");

        error.statusCode = response.status;
        error.errors = data.errors || {};

        throw error;
    }

    return data;
}