"use client";

import { usePathname } from "next/navigation";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePlatformSettings } from "@/providers/SettingsProvider";

const AUTH_PATHS = ["/login", "/forgot-password", "/reset-password", "/verify-otp"];

export default function MaintenanceGate({ children }) {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const { language } = useLanguage();
    const { settings } = usePlatformSettings();

    const authPage = AUTH_PATHS.some((path) => pathname.startsWith(path));
    const canBypass = user?.role === "admin" || authPage;

    if (!loading && settings.maintenanceMode === true && !canBypass) {
        const isEnglish = language === "en";
        return (
            <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
                <section className="glass w-full max-w-xl rounded-3xl border border-border p-8 text-center shadow-xl">
                    <HiOutlineWrenchScrewdriver className="mx-auto text-warning" size={64} />
                    <h1 className="mt-5 text-3xl font-bold text-text-primary">
                        {isEnglish ? "We’ll be back shortly" : "سنعود قريبًا"}
                    </h1>
                    <p className="mt-3 leading-7 text-text-secondary">
                        {isEnglish
                            ? "The platform is undergoing scheduled maintenance. Please try again soon."
                            : "المنصة تخضع حالياً لأعمال صيانة مجدولة. يرجى المحاولة مرة أخرى قريباً."}
                    </p>
                    {settings.supportEmail && (
                        <a href={`mailto:${settings.supportEmail}`} className="mt-6 inline-block font-semibold text-primary hover:underline">
                            {settings.supportEmail}
                        </a>
                    )}
                </section>
            </main>
        );
    }

    return children;
}
