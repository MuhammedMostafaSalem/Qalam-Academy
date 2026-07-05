"use client";

import Link from "next/link";
import { BsPersonPlus } from "react-icons/bs";

import Button from "@/components/ui/Button";
import { fadeLeft } from "@/lib/animationHelpers";
import AuthInput from "../AuthInput";
import AuthCard from "../AuthCard";
import RememberMe from "../RememberMe";
import SectionTitle from "@/components/sections/SectionTitle"
import SectionDescription from "@/components/sections/SectionDescription"

const RegisterForm = () => {
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
            "
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-2">
                <SectionTitle>
                    انشاء حساب جديد
                </SectionTitle>

                <SectionDescription>
                    املأ البيانات التالية لانشاء حساب جديد
                </SectionDescription>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="
                    space-y-6
                "
            >
                <AuthInput
                    type="text"
                    name="name"
                    label="الأسم بالكامل"
                    placeholder="اكتب اسمك بالكامل هنا"
                />
                <AuthInput
                    type="email"
                    name="email"
                    label="البريد الإلكتروني"
                    placeholder="example@email.com"
                />

                <AuthInput
                    type="password"
                    name="password"
                    label="تأكيد كلمة المرور"
                    placeholder="••••••••••"
                />
                
                <AuthInput
                    type="password"
                    name="confirm password"
                    label="كلمة المرور"
                    placeholder="••••••••••"
                />

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
                    <BsPersonPlus size={20} />

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
                لديك حساب بالفعل؟

                <Link
                    href="/login"
                    className="
                        mr-2
                        font-semibold
                        text-primary
                        transition-colors
                        hover:text-primary-hover
                    "
                >
                    تسجيل حساب
                </Link>
            </p>
        </AuthCard>
    );
};

export default RegisterForm;