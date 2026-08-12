"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get Settings
export async function getSettingsAction() {
    try {
        const response = await authApi("/settings", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب الإعدادات",
            data: null,
        };
    }
}

// Update Settings
export async function updateSettingsAction(prevState, formData) {
    try {
        // Construct the FormData body
        const body = new FormData();

        const keys = [
            "siteName", "siteDescription", "supportEmail", "supportPhone", "whatsapp",
            "address", "facebook", "instagram", "linkedin", "youtube", "twitter", "tiktok",
            "allowRegistration", "maintenanceMode", "currency", "defaultLanguage"
        ];

        keys.forEach(key => {
            const value = formData.get(key);
            if (value !== null && value !== "") {
                body.append(key, value);
            }
        });

        const seoTitle = formData.get("seoTitle");
        if (seoTitle) body.append("seoTitle", seoTitle);

        const seoDescription = formData.get("seoDescription");
        if (seoDescription) body.append("seoDescription", seoDescription);

        // seoKeywords: an array of strings in schema, backend might need them appended multiple times or as JSON. We'll append multiple.
        const seoKeywords = formData.getAll("seoKeywords");
        if (seoKeywords && seoKeywords.length > 0) {
            seoKeywords.forEach(kw => {
                if (kw) body.append("seoKeywords", kw);
            });
        } else {
            const seoKeywordsString = formData.get("seoKeywordsString");
            if (seoKeywordsString) {
                const kws = seoKeywordsString.split(",").map(k => k.trim()).filter(k => k);
                kws.forEach(kw => body.append("seoKeywords", kw));
            }
        }

        const logoDark = formData.get("logoDark");
        if (logoDark instanceof File && logoDark.size > 0) body.append("logoDark", logoDark);
        
        const logoLight = formData.get("logoLight");
        if (logoLight instanceof File && logoLight.size > 0) body.append("logoLight", logoLight);

        const favicon = formData.get("favicon");
        if (favicon instanceof File && favicon.size > 0) body.append("favicon", favicon);

        const response = await authApi("/settings", {
            method: "PATCH",
            body,
        });

        revalidatePath("/", "layout");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث الإعدادات بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث الإعدادات",
            errors: error?.errors || null,
        };
    }
}
