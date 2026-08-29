"use client";

import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";

import AuthCard from "../AuthCard";
import AuthInput from "../AuthInput";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import useForgotPasswordForm from "@/hooks/auth/useForgotPasswordForm";
import { useLanguage } from "@/providers/LanguageProvider";

const ForgetPasswordForm = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        formAction,
        loading,
        errors,
        fieldErrors,
        handleInputChange,
    } = useForgotPasswordForm();

    const errorMessage = errors || fieldErrors.email;

    return (
        <AuthCard className="w-full max-w-lg rounded-[28px] border border-border bg-card p-5 sm:p-6 shadow-xl">
            {/* Header */}
            <div className="mb-8 flex flex-col items-center gap-2 text-center">
                <SectionTitle className="text-2xl sm:text-3xl font-bold">
                    {isEn ? "Forgot Password?" : "نسيت كلمة المرور؟"}
                </SectionTitle>

                <SectionDescription className="text-sm text-text-secondary">
                    {isEn
                        ? "Enter your email and we will send you a verification code to reset your password."
                        : "أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور."}
                </SectionDescription>
            </div>

            {/* Form */}
            <form
                action={formAction}
                className="space-y-5"
            >
                <AuthInput
                    type="email"
                    name="email"
                    label={isEn ? "Email Address" : "البريد الإلكتروني"}
                    placeholder="example@email.com"
                    onChange={handleInputChange}
                    error={errorMessage}
                    required
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="gradient-button flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-semibold shadow-lg"
                >
                    <MdOutlineEmail size={20} />

                    <span>
                        {loading
                            ? (isEn ? "Sending code..." : "جارٍ إرسال الرمز...")
                            : (isEn ? "Send Verification Code" : "إرسال رمز التحقق")}
                    </span>
                </Button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-text-secondary">
                {isEn ? "Remembered your password?" : "تذكرت كلمة المرور؟"}

                <Link
                    href="/login"
                    className="mx-2 font-semibold text-primary hover:underline"
                >
                    {isEn ? "Sign in" : "تسجيل الدخول"}
                </Link>
            </p>
        </AuthCard>
    );
};

export default ForgetPasswordForm;