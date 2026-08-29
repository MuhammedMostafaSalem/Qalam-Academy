export const THEME_MODES = Object.freeze({
    LIGHT: "light",
    DARK: "dark",
});

export const DEFAULT_THEME_MODE = THEME_MODES.DARK;

export const THEME_COOKIE_NAME = "Qalam_Theme_Mode";
export const THEME_STORAGE_KEY = "qalam.theme.mode";

export const PALETTE_KEYS = Object.freeze([
    "primary",
    "secondary",
    "accent",
    "background",
    "surface",
    "text",
    "mutedText",
    "border",
    "success",
    "warning",
    "danger",
]);

/** @type {{ light: Record<string, string>, dark: Record<string, string> }} */
export const FALLBACK_PALETTES = Object.freeze({
    light: Object.freeze({
        primary: "#2563EB",
        secondary: "#14B8A6",
        accent: "#F59E0B",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#0F172A",
        mutedText: "#64748B",
        border: "#E2E8F0",
        success: "#22C55E",
        warning: "#EAB308",
        danger: "#EF4444",
    }),
    dark: Object.freeze({
        primary: "#3B82F6",
        secondary: "#2DD4BF",
        accent: "#FBBF24",
        background: "#020617",
        surface: "#0F172A",
        text: "#F8FAFC",
        mutedText: "#94A3B8",
        border: "#334155",
        success: "#22C55E",
        warning: "#FACC15",
        danger: "#F87171",
    }),
});

export function isThemeMode(value) {
    return value === THEME_MODES.LIGHT || value === THEME_MODES.DARK;
}

export function isHexColor(value) {
    return typeof value === "string" && /^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value.trim());
}

export function normalizeHexColor(value, fallback) {
    if (!isHexColor(value)) return fallback;

    const normalized = value.trim().toUpperCase();
    if (normalized.length === 4) {
        return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
    }

    return normalized;
}

export function normalizePalette(palette, mode) {
    const fallback = FALLBACK_PALETTES[mode] || FALLBACK_PALETTES[DEFAULT_THEME_MODE];
    const source = palette && typeof palette === "object" ? palette : {};

    return PALETTE_KEYS.reduce((result, key) => {
        result[key] = normalizeHexColor(source[key], fallback[key]);
        return result;
    }, {});
}

export function normalizePalettePair(value) {
    const source = value && typeof value === "object" ? value : {};

    return {
        light: normalizePalette(source.light, THEME_MODES.LIGHT),
        dark: normalizePalette(source.dark, THEME_MODES.DARK),
    };
}

export function normalizeThemeMode(value, fallback = DEFAULT_THEME_MODE) {
    return isThemeMode(value) ? value : fallback;
}

export function getRootThemeStyle(palettes) {
    const normalized = normalizePalettePair(palettes);
    const style = {};

    Object.entries(normalized).forEach(([mode, palette]) => {
        PALETTE_KEYS.forEach((key) => {
            style[`--theme-${mode}-${key}`] = palette[key];
        });
    });

    return style;
}

export function readStoredThemeMode() {
    if (typeof window === "undefined") return null;

    // Prefer the cookie because the server uses it for the first paint.
    const cookieMode = document.cookie
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${THEME_COOKIE_NAME}=`))
        ?.split("=")[1];

    if (isThemeMode(cookieMode)) return cookieMode;

    try {
        const localMode = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (isThemeMode(localMode)) return localMode;
    } catch {
        // Storage can be disabled by privacy settings; the cookie still works.
    }

    return null;
}

export function persistThemeMode(mode) {
    const safeMode = normalizeThemeMode(mode);

    if (typeof window === "undefined") return safeMode;

    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, safeMode);
    } catch {
        // Cookie persistence below remains available.
    }

    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${THEME_COOKIE_NAME}=${safeMode}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;

    return safeMode;
}

export function readThemeModeFromCookie(cookieStore) {
    return normalizeThemeMode(cookieStore?.get?.(THEME_COOKIE_NAME)?.value);
}
