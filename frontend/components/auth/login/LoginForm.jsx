"use client";

import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import { fadeLeft } from "@/lib/animationHelpers";
import AuthInput from "../AuthInput";
import AuthCard from "../AuthCard";
import RememberMe from "../RememberMe";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import useLoginForm from "@/hooks/auth/useLoginForm";
import { useLanguage } from "@/providers/LanguageProvider";

const LoginForm = () => {
    const { language, isRtl } = useLanguage();
    const isEn = language === "en";

    const {
        formAction,
        loading,
        fieldErrors,
        handleInputChange,
    } = useLoginForm();

    return (
        <AuthCard
            {...fadeLeft()}
            className="
                w-full
                rounded-fullCard
                border
                border-border
                bg-card
            "
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-2">
                <SectionTitle>
                    {isEn ? "Login" : "تسجيل الدخول"}
                </SectionTitle>

                <SectionDescription>
                    {isEn ? "Sign in to your account to continue" : "سجل الدخول إلى حسابك للمتابعة"}
                </SectionDescription>
            </div>

            {/* Form */}
            <form
                action={formAction}
                className="
                    mt-5
                    space-y-6
                "
            >
                <AuthInput
                    type="email"
                    name="email"
                    label={isEn ? "Email Address" : "البريد الإلكتروني"}
                    placeholder="example@email.com"
                    onChange={handleInputChange}
                    error={fieldErrors.email}
                    required
                />

                <AuthInput
                    type="password"
                    name="password"
                    label={isEn ? "Password" : "كلمة المرور"}
                    placeholder="••••••••••"
                    onChange={handleInputChange}
                    error={fieldErrors.password}
                    required
                />

                <RememberMe />

                <Button
                    type="submit"
                    disabled={loading}
                    className="
                        gradient-button
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    {isRtl ? <HiArrowLeft size={20} /> : <HiArrowRight size={20} />}

                    <span>
                        {loading
                            ? (isEn ? "Logging in..." : "جاري تسجيل الدخول...")
                            : (isEn ? "Login" : "تسجيل الدخول")}
                    </span>
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
                {isEn ? "Don't have an account?" : "ليس لديك حساب؟"}

                <Link
                    href="/register"
                    className="
                        mx-2
                        font-semibold
                        text-primary
                        transition-colors
                        hover:text-primary-hover
                    "
                >
                    {isEn ? "Create an account" : "إنشاء حساب جديد"}
                </Link>
            </p>
        </AuthCard>
    );
};

export default LoginForm;