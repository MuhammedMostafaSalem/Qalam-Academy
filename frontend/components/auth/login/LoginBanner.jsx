"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logos/logo-white.png";
import loginIllustration from "@/public/assets/images/login-illustration.png";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";

const LoginBanner = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            {...heroAnimation.image}
            className="
                relative
                flex
                w-full
                flex-col
                justify-between
                overflow-hidden
                bg-background
                p-10
            "
        >
            {/* Logo */}
            <Link
                href="/"
                className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-3
                "
            >
                <Image
                    src={logo}
                    alt="Qalam Academy"
                    width={42}
                    height={42}
                    priority
                />

                <div>
                    <h2 className="text-2xl font-bold">
                        {isEn ? "Qalam Academy" : "قلم أكاديمي"}
                    </h2>

                    <p className="text-sm text-text-secondary">
                        Software Academy
                    </p>
                </div>
            </Link>

            {/* Illustration */}
            <div
                className={`
                    relative
                    z-10
                    flex
                    justify-center
                    ${animations.floating}
                `}
            >
                <Image
                    src={loginIllustration}
                    alt={isEn ? "Login illustration" : "صورة توضيحية لتسجيل الدخول"}
                    width={160}
                    height={160}
                    priority
                    className="
                        h-auto
                        w-full
                        max-w-[160px]
                        object-contain
                    "
                />
            </div>

            {/* Bottom */}
            <div
                className="
                    relative
                    z-10
                    text-center
                    flex
                    flex-col
                    gap-3
                "
            >
                <h2
                    className="
                        text-3xl
                        font-bold
                        leading-tight
                    "
                >
                    {isEn ? "Welcome to" : "مرحبًا بك في"}
                </h2>

                <h3
                    className="
                        text-2xl
                        font-bold
                        gradient-text
                    "
                >
                    Qalam Academy
                </h3>

                <p
                    className="
                        text-base
                        leading-8
                        text-text-secondary
                    "
                >
                    {isEn
                        ? "Sign in to access your dashboard and manage courses, students, and content with ease."
                        : "قم بتسجيل الدخول للوصول إلى لوحة التحكم وإدارة الكورسات والطلاب والمحتوى بكل سهولة."}
                </p>

                <p
                    className="
                        mt-12
                        text-sm
                        text-text-muted
                    "
                >
                    © 2026 Qalam Academy. {isEn ? "All rights reserved." : "جميع الحقوق محفوظة."}
                </p>
            </div>

            {/* Floating Elements */}
            <div
                className="
                    absolute
                    top-36
                    left-10
                    h-4
                    w-4
                    rounded-full
                    bg-primary
                    blur-sm
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    right-12
                    top-52
                    h-2
                    w-2
                    rounded-full
                    bg-secondary
                    animate-pulse
                "
            />
        </div>
    );
};

export default LoginBanner;
