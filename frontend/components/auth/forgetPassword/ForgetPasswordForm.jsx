"use client";

import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";

import AuthCard from "../AuthCard";
import AuthInput from "../AuthInput";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";

import useForgotPasswordForm from "@/hooks/auth/useForgotPasswordForm";

const ForgetPasswordForm = () => {
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
                    نسيت كلمة المرور؟
                </SectionTitle>

                <SectionDescription className="text-sm text-text-secondary">
                    أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور.
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
                    label="البريد الإلكتروني"
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
                            ? "جارٍ إرسال الرمز..."
                            : "إرسال رمز التحقق"}
                    </span>
                </Button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-text-secondary">
                تذكرت كلمة المرور؟

                <Link
                    href="/login"
                    className="mr-2 font-semibold text-primary hover:underline"
                >
                    تسجيل الدخول
                </Link>
            </p>
        </AuthCard>
    );
};

export default ForgetPasswordForm;