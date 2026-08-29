"use client";

import Image from "next/image"
import Link from "next/link"
import logo from "@/public/assets/logos/logo-blue.png"
import { animations } from "@/lib/animations"
import { useLanguage } from "@/providers/LanguageProvider"
import { useTheme } from "@/providers/ThemeProvider"
import { usePlatformSettings } from "@/providers/SettingsProvider"

const Logo = () => {
    const { language } = useLanguage();
    const { isDark } = useTheme();
    const { settings } = usePlatformSettings();
    const dynamicLogo = isDark
        ? (settings.logoLight || settings.logoDark)
        : (settings.logoDark || settings.logoLight);
    const siteName = settings.siteName || (language === "en" ? "Qalam Academy" : "أكاديمية قلم");

    return (
        <Link
            href="/"
            aria-label={siteName}
            className={`
                flex
                items-center
                gap-2
                ${animations.transition}
                hover:scale-105
            `}
        >
            {dynamicLogo ? (
                <img src={dynamicLogo} alt={siteName} className="h-[55px] w-auto object-contain" />
            ) : (
                <Image
                    src={logo}
                    alt={siteName}
                    width={55}
                    height={55}
                    priority
                    className="h-auto w-auto"
                />
            )}
            <span>{siteName}</span>
        </Link>
    )
}

export default Logo
