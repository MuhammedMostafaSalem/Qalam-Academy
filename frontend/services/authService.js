import { cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api` || "http://localhost:5000/api";

// Set Access Token Cookie
export async function setAccessTokenCookie(accessToken) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 10 * 60, // 10 minutes
    });
}

// Set Session Expiration Marker
// ==========================================
// IMPORTANT:
// This cookie does NOT contain any token.
// It's only used by the client-side timer.
export async function setSessionExpirationCookie() {
    const cookieStore = await cookies();

    const expiresAt = Date.now() + 90 * 24 * 60 * 60 * 1000;

    cookieStore.set("sessionExpiresAt", String(expiresAt), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 90 * 24 * 60 * 60,
    });

    return expiresAt;
}

// Clear Authentication Cookies
export async function clearAuthCookies() {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionExpiresAt");
}


export async function authApi(endpoint, options = {}) {
    // const cookieStore = await cookies();

    // Request function
    // 1. تجهيز الطلب
    const request = async () => {
        // IMPORTANT:
        // Read cookies again every request.
        // This makes sure we get the newly refreshed accessToken.
        const cookieStore = await cookies();

        const accessToken = cookieStore.get("accessToken")?.value;

        // تجهيز الـ Headers وإرسال الـ Access Token و الـ Refresh Token (لو تطلب الأمر في الكوكيز)
        const cookieString = cookieStore
            .getAll()
            .map((c) => `${c.name}=${c.value}`)
            .join("; ");

        const headers = {
            "Content-Type": "application/json",

            ...(accessToken
                ? {
                    Authorization: `Bearer ${accessToken}`,
                }
                : {}),

            ...(cookieString
                ? {
                    Cookie: cookieString,
                }
                : {}),

            ...options.headers,
        }

        return await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            cache: "no-store",
        });
    }

    // First Request
    // 2. تنفيذ الطلب الأول
    let response = await request();

    // 3. (المنطق الذكي): لو الطلب فشل بـ 401، حاول تجديد التوكن
    if (
        response.status === 401 &&
        endpoint !== "/auth/refresh-token" &&
        endpoint !== "/auth/login"
    ) {
        try {
            const cookieStore = await cookies();

            const refreshToken = cookieStore.get("refreshToken")?.value;

            // No Refresh Token
            if (!refreshToken) {
                await clearAuthCookies();

                throw new Error("SESSION_EXPIRED");
            }

            // Refresh Access Token
            const refreshRes = await fetch(
                `${API_URL}/auth/refresh-token`,
                {
                    method: "POST",

                    headers: {
                        Cookie: `refreshToken=${refreshToken}`,
                    },

                    cache: "no-store",
                }
            );

            const refreshData = await refreshRes.json();

            // Refresh failed
            if (
                !refreshRes.ok ||
                !refreshData.data?.accessToken
            ) {
                await clearAuthCookies();

                throw new Error("SESSION_EXPIRED");
            }

            // Save new access token
            await setAccessTokenCookie(
                refreshData.data.accessToken
            );

            // Retry original request
            response = await request();
        } catch (err) {
            console.error(
                "Auto refresh token failed:",
                err
            );

            await clearAuthCookies();

            throw new Error("SESSION_EXPIRED");
        }
    }

    // const data = await response.json();
    // 3. Parse response
    const data = await response.json();

    // if (!response.ok) throw new Error(data.message || "حدث خطأ ما");
    if (!response.ok) {
        throw new Error(
            data.message || "حدث خطأ ما"
        );
    }

    return data;
}