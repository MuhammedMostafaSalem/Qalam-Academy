export const DEFAULT_AVATAR_URL = "/assets/user-icon.png";

export function resolveAvatarUrl(avatar) {
    const value = typeof avatar === "string" ? avatar.trim() : avatar?.src;

    if (!value) return DEFAULT_AVATAR_URL;
    if (/^(https?:|data:|blob:)/i.test(value)) return value;
    if (value.startsWith("/uploads/")) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        return `${baseUrl}${value}`;
    }
    if (value.startsWith("/")) return value;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    return `${baseUrl}/${value}`;
}
