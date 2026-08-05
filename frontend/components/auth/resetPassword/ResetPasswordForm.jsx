"use client";

import { MdLockOutline } from "react-icons/md";
import Link from "next/link";

import AuthCard from "../AuthCard";
import AuthInput from "../AuthInput";

import Button from "@/components/ui/Button";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";

import useResetPasswordForm from "@/hooks/auth/useResetPasswordForm";

const ResetPasswordForm = () => {
    const {
        formData,
        loading,
        fieldErrors,
        handleChange,
        handleSubmit,
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
                    إعادة تعيين كلمة المرور
                </SectionTitle>

                <SectionDescription>
                    أدخل كلمة المرور الجديدة لحسابك
                </SectionDescription>
            </div>


            <form
                onSubmit={handleSubmit}
                className="
                    space-y-5
                "
            >
                <AuthInput
                    type="password"
                    name="password"
                    label="كلمة المرور الجديدة"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    error={fieldErrors.password}
                />

                <AuthInput
                    type="password"
                    name="confirmPassword"
                    label="تأكيد كلمة المرور"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={fieldErrors.confirmPassword}
                />

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

                    {
                        loading
                            ?
                            "جارٍ التحديث..."
                            :
                            "تغيير كلمة المرور"
                    }
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
                تذكرت كلمة المرور؟

                <Link
                    href="/login"
                    className="
                        mr-2
                        font-semibold
                        text-primary
                        hover:underline
                    "
                >
                    تسجيل الدخول
                </Link>
            </p>
        </AuthCard>
    );
};


export default ResetPasswordForm;