"use client";

import Link from "next/link"
import { animations } from "@/lib/animations"
import { ctaAnimation } from "@/lib/animation/ctaAnimation"
import { useLanguage } from "@/providers/LanguageProvider"

const baseClasses = `
    rounded-full
    p-3
    w-full
    text-center
    font-semibold
    shadow-xl
    ${animations.transition}
    ${animations.press}
    hover:shadow-neon
    hover:-translate-y-1
`;

const CTAButton = () => {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col gap-3 lg:flex-row items-center w-full">
            <Link
                href="/login"
                {...ctaAnimation.buttons}
                className={`${baseClasses} btn-primary flex-1 whitespace-nowrap`}
            >
                {language === "en" ? "Log In" : "تسجيل الدخول"}
            </Link>

            <Link
                href="/register"
                className={`${baseClasses} btn-outline flex-1 whitespace-nowrap`}
            >
                {language === "en" ? "Create Account" : "إنشاء حساب"}
            </Link>
        </div>

    )
}

export default CTAButton
