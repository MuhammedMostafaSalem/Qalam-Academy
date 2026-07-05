"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import { fadeLeft } from "@/lib/animationHelpers";
import AuthInput from "../AuthInput";
import AuthCard from "../AuthCard";
import RememberMe from "../RememberMe";
import SectionTitle from "@/components/sections/SectionTitle"
import SectionDescription from "@/components/sections/SectionDescription"

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO:
        // React Hook Form
        // Login API
        // Validation
    };

    return (
        <AuthCard
            {...fadeLeft()}
            className="
                w-full
                rounded-fullCard
                border
                border-border
                bg-card
                backdrop-blur-xl
                shadow-xl
            "
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-2">
                <SectionTitle>
                    تسجيل الدخول
                </SectionTitle>

                <SectionDescription>
                    سجل الدخول إلى حسابك للمتابعة
                </SectionDescription>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                mt-5
                    space-y-6
                "
            >
                <AuthInput
                    type="email"
                    name="email"
                    label="البريد الإلكتروني"
                    placeholder="example@email.com"
                />

                <AuthInput
                    type="password"
                    name="password"
                    label="كلمة المرور"
                    placeholder="••••••••••"
                />

                <RememberMe />

                <Button
                    type="submit"
                    className="
                        gradient-button
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <HiArrowRight size={20} />

                    <span>تسجيل الدخول</span>
                </Button>
            </form>

            {/* Register */}
            <p
                className="
                    mt-8
                    text-center
                    text-sm
                    text-text-secondary
                "
            >
                ليس لديك حساب؟

                <Link
                    href="/register"
                    className="
                        mr-2
                        font-semibold
                        text-primary
                        transition-colors
                        hover:text-primary-hover
                    "
                >
                    إنشاء حساب جديد
                </Link>
            </p>
        </AuthCard>
    );
};

export default LoginForm;