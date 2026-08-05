"use client";

import AuthCard from "../AuthCard";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import useVerifyOtpForm from "@/hooks/auth/useVerifyOtpForm";

const VerifyOtpForm = () => {
    const {
        email,
        type,
        otp,
        seconds,
        loading,
        error,
        message,
        handleOtpChange,
        handleSubmit,
        handleResend,
    } = useVerifyOtpForm();


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
                    {
                        type === "reset-password"
                            ?
                            "إعادة تعيين كلمة المرور"
                            :
                            "تأكيد البريد الإلكتروني"
                    }
                </SectionTitle>

                <SectionDescription>
                    {
                        type === "reset-password"
                            ?
                            "ادخل الكود المرسل إلى بريدك لإعادة تعيين كلمة المرور"
                            :
                            "ادخل الكود المرسل إلى بريدك"
                    }
                </SectionDescription>

                <p className="text-sm text-text-secondary">
                    {email}
                </p>
            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <input
                    value={otp}
                    onChange={handleOtpChange}
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

                {
                    error &&
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                }

                <Button
                    type="submit"
                    disabled={
                        loading ||
                        otp.length !== 6
                    }

                    className="
                        gradient-button
                        w-full
                    "
                >
                    {
                        loading
                            ?
                            "جاري التأكيد..."
                            :
                            type === "reset-password"
                                ?
                                "تأكيد الكود"
                                :
                                "تأكيد الحساب"
                    }
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
                        ?
                        "text-text-secondary cursor-not-allowed"
                        :
                        "text-primary hover:text-primary-hover"
                    }
                `}
            >
                {
                    seconds > 0
                        ?
                        `إعادة إرسال الكود بعد ${seconds} ثانية`
                        :
                        "إعادة إرسال الكود"
                }
            </button>
        </AuthCard>
    );
};

export default VerifyOtpForm;