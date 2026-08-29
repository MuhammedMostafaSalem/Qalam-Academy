"use client";

import AuthCard from "../AuthCard";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import useVerifyOtpForm from "@/hooks/auth/useVerifyOtpForm";
import { useLanguage } from "@/providers/LanguageProvider";

const VerifyOtpForm = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        email,
        type,
        seconds,
        formAction,
        loading,
        errors,
        fieldErrors,
        handleInputChange,
        handleResend
    } = useVerifyOtpForm();

    const errorMessage = errors || fieldErrors?.otp;

    const getTitle = () => {
        if (type === "reset-password") {
            return isEn ? "Reset Password" : "إعادة تعيين كلمة المرور";
        }
        return isEn ? "Verify Email Address" : "تأكيد البريد الإلكتروني";
    };

    const getDescription = () => {
        if (type === "reset-password") {
            return isEn ? "Enter the verification code sent to your email to reset your password" : "ادخل الكود المرسل إلى بريدك لإعادة تعيين كلمة المرور";
        }
        return isEn ? "Enter the verification code sent to your email" : "ادخل الكود المرسل إلى بريدك";
    };

    return (
        <AuthCard
            className="
                rounded-fullCard
                border
                border-border
                bg-card
            "
        >
            <div
                className="
                    mb-8
                    flex
                    flex-col
                    items-center
                    gap-2
                "
            >
                <SectionTitle>
                    {getTitle()}
                </SectionTitle>

                <SectionDescription>
                    {getDescription()}
                </SectionDescription>

                <p className="text-sm text-text-secondary">
                    {email}
                </p>
            </div>

            <form
                action={formAction}
                className="space-y-6"
            >
                <input
                    type="hidden"
                    name="email"
                    value={email}
                />
                <input
                    type="hidden"
                    name="purpose"
                    value={type === "reset-password" ? "forgot_password" : "email_verification"}
                />

                <input
                    name="otp"
                    onChange={handleInputChange}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="000000"
                    className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background-alt
                        text-center
                        text-2xl
                        tracking-[10px]
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/20
                    "
                />

                {errorMessage && (
                    <p className="text-sm text-error text-center">
                        {errorMessage}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="
                        gradient-button
                        w-full
                    "
                >
                    {loading
                        ? (isEn ? "Verifying..." : "جاري التأكيد...")
                        : type === "reset-password"
                            ? (isEn ? "Verify Code" : "تأكيد الكود")
                            : (isEn ? "Verify Account" : "تأكيد الحساب")}
                </Button>
            </form>

            <button
                type="button"
                disabled={seconds > 0}
                onClick={handleResend}
                className={`
                    mt-6
                    w-full
                    text-sm
                    transition
                    ${seconds > 0
                        ? "text-text-secondary cursor-not-allowed"
                        : "text-primary hover:text-primary-hover"
                    }
                `}
            >
                {seconds > 0
                    ? (isEn ? `Resend code in ${seconds}s` : `إعادة إرسال الكود بعد ${seconds} ثانية`)
                    : (isEn ? "Resend Code" : "إعادة إرسال الكود")}
            </button>
        </AuthCard>
    );
};

export default VerifyOtpForm;
