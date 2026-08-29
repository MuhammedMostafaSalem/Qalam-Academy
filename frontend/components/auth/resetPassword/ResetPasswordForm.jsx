"use client";

import { MdLockOutline } from "react-icons/md";
import Link from "next/link";

import AuthCard from "../AuthCard";
import AuthInput from "../AuthInput";

import Button from "@/components/ui/Button";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";

import useResetPasswordForm from "@/hooks/auth/useResetPasswordForm";
import { useLanguage } from "@/providers/LanguageProvider";

const ResetPasswordForm = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        token,
        formAction,
        loading,
        errors,
        fieldErrors,
        handleInputChange,
    } = useResetPasswordForm();

    return (
        <AuthCard
            className="
                w-full
                max-w-lg
                rounded-[28px]
                border
                border-border
                bg-card
                p-5
                sm:p-6
                shadow-xl
            "
        >
            <div
                className="
                    mb-8
                    flex
                    flex-col
                    items-center
                    gap-2
                    text-center
                "
            >
                <SectionTitle
                    className="
                        text-2xl
                        sm:text-3xl
                        font-bold
                    "
                >
                    {isEn ? "Reset Password" : "إعادة تعيين كلمة المرور"}
                </SectionTitle>

                <SectionDescription>
                    {isEn ? "Enter the new password for your account" : "أدخل كلمة المرور الجديدة لحسابك"}
                </SectionDescription>
            </div>

            <form
                action={formAction}
                className="space-y-5"
            >
                {/* Hidden token for Server Action */}
                <input
                    type="hidden"
                    name="token"
                    value={token}
                />

                <AuthInput
                    type="password"
                    name="password"
                    label={isEn ? "New Password" : "كلمة المرور الجديدة"}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    error={fieldErrors.password}
                    required
                />

                <AuthInput
                    type="password"
                    name="confirmPassword"
                    label={isEn ? "Confirm Password" : "تأكيد كلمة المرور"}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    error={fieldErrors.confirmPassword}
                    required
                />

                {errors && (
                    <p className="text-sm text-error text-center">
                        {errors}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="
                        gradient-button
                        flex
                        h-14
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        text-base
                        font-semibold
                        shadow-lg
                    "
                >
                    <MdLockOutline size={20} />

                    <span>
                        {loading
                            ? (isEn ? "Updating..." : "جارٍ التحديث...")
                            : (isEn ? "Change Password" : "تغيير كلمة المرور")}
                    </span>
                </Button>
            </form>

            <p
                className="
                    mt-6
                    text-center
                    text-sm
                    text-text-secondary
                "
            >
                {isEn ? "Remembered your password?" : "تذكرت كلمة المرور؟"}

                <Link
                    href="/login"
                    className="
                        mx-2
                        font-semibold
                        text-primary
                        hover:underline
                    "
                >
                    {isEn ? "Sign in" : "تسجيل الدخول"}
                </Link>
            </p>
        </AuthCard>
    );
};

export default ResetPasswordForm;
