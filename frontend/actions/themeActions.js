"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "@/services/authService";
import {
    isThemeMode,
    normalizePalettePair,
} from "@/constants/theme";

export async function getPlatformThemeAction() {
    try {
        const response = await authApi("/settings/theme", { method: "GET" });
        return {
            success: true,
            data: normalizePalettePair(response.data),
            message: response.message || "Theme fetched successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "Failed to fetch theme",
            statusCode: error?.statusCode || null,
        };
    }
}

export async function updatePlatformThemeAction(palettes) {
    const theme = normalizePalettePair(palettes);

    try {
        const response = await authApi("/settings/theme", {
            method: "PATCH",
            body: JSON.stringify({ theme }),
        });

        revalidatePath("/", "layout");

        return {
            success: true,
            data: normalizePalettePair(response.data),
            message: response.message || "Theme updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "Failed to update theme",
            errors: error?.errors || null,
            statusCode: error?.statusCode || null,
        };
    }
}

export async function getThemeModeAction() {
    try {
        const response = await authApi("/users/theme", { method: "GET" });
        const themeMode = response.data?.themeMode;

        return {
            success: isThemeMode(themeMode),
            data: isThemeMode(themeMode) ? { themeMode } : null,
            message: response.message || "Theme mode fetched successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "Failed to fetch theme mode",
            statusCode: error?.statusCode || null,
            authExpired: error?.authExpired || false,
        };
    }
}

export async function setThemeModeAction(themeMode) {
    if (!isThemeMode(themeMode)) {
        return {
            success: false,
            data: null,
            message: "Invalid theme mode",
            statusCode: 400,
        };
    }

    try {
        const response = await authApi("/users/theme/toggle", {
            method: "PATCH",
            body: JSON.stringify({ themeMode }),
        });

        const savedMode = response.data?.themeMode;

        return {
            success: isThemeMode(savedMode),
            data: isThemeMode(savedMode) ? { themeMode: savedMode } : null,
            message: response.message || "Theme mode updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "Failed to update theme mode",
            statusCode: error?.statusCode || null,
            authExpired: error?.authExpired || false,
        };
    }
}
