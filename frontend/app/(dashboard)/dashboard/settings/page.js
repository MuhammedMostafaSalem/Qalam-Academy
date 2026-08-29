"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import SettingsForm from "@/components/dashboard/settings/SettingsForm";
import ThemeSettingsForm from "@/components/dashboard/settings/ThemeSettingsForm";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AdminSettings() {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <PageHeader
                title={isEn ? "Platform Settings" : "إعدادات المنصة"}
                description={isEn ? "Manage general platform details and configuration" : "إدارة جميع المعلومات الأساسية للمنصة"}
            />
            
            <SettingsForm />
            <ThemeSettingsForm />
        </div>
    );
}
