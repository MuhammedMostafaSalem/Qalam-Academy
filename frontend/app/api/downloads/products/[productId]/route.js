import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export async function GET(request, { params }) {
    const { productId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("Qalam_Token")?.value;
    const language = cookieStore.get("NEXT_LOCALE")?.value || cookieStore.get("NEXT_LANG")?.value || "ar";

    if (!token) {
        return NextResponse.json(
            { success: false, message: language === "en" ? "Please sign in to download this file" : "يرجى تسجيل الدخول لتنزيل هذا الملف" },
            { status: 401 }
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/api/enrollments/my-products/${encodeURIComponent(productId)}/download`,
        {
            method: "GET",
            headers: {
                Cookie: `Qalam_Token=${token}`,
                "Accept-Language": language,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        let message = language === "en" ? "Unable to download this file" : "تعذر تنزيل هذا الملف";
        try {
            const error = await response.json();
            if (error?.message) message = error.message;
        } catch {
            // Keep the localized fallback when the backend did not return JSON.
        }

        return NextResponse.json({ success: false, message }, { status: response.status });
    }

    const headers = new Headers();
    headers.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    headers.set("Content-Disposition", response.headers.get("content-disposition") || "attachment");
    headers.set("Cache-Control", "private, no-store");

    const contentLength = response.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(response.body, {
        status: 200,
        headers,
    });
}
