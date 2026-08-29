"use client";

import Link from "next/link";
import { BsPersonPlus } from "react-icons/bs";

import Button from "@/components/ui/Button";
import { fadeLeft } from "@/lib/animationHelpers";
import AuthInput from "../AuthInput";
import AuthCard from "../AuthCard";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import useRegisterForm from "@/hooks/auth/useRegisterForm";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePlatformSettings } from "@/providers/SettingsProvider";

const RegisterForm = () => {
    const { language } = useLanguage();
    const { settings } = usePlatformSettings();
    const isEn = language === "en";

    const {
        formAction,
        loading,
        fieldErrors,
        handleInputChange
    } = useRegisterForm();

    if (settings.allowRegistration === false) {
        return (
            <AuthCard className="w-full max-w-xl rounded-[28px] border border-border bg-card p-8 text-center shadow-xl">
                <SectionTitle>{isEn ? "Registration is currently closed" : "التسجيل مغلق حالياً"}</SectionTitle>
                <SectionDescription className="mt-3">
                    {isEn
                        ? "New account registration has been disabled by the platform administrator."
                        : "تم إيقاف تسجيل الحسابات الجديدة بواسطة إدارة المنصة."}
                </SectionDescription>
                <Link href="/login" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-white">
                    {isEn ? "Go to sign in" : "الانتقال لتسجيل الدخول"}
                </Link>
            </AuthCard>
        );
    }

    return (
        <AuthCard
            className="w-full max-w-xl rounded-[28px] border border-border bg-card p-5 sm:p-6 shadow-xl"
        >
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-2 mb-8">
                <SectionTitle className="text-2xl sm:text-3xl font-bold">
                    {isEn ? "Create New Account" : "انشاء حساب جديد"}
                </SectionTitle>
                <SectionDescription className="text-sm text-text-secondary">
                    {isEn
                        ? "Fill in your details below to join Qalam Academy"
                        : "املأ البيانات التالية لانضمامك إلى منصة Qalam Academy"}
                </SectionDescription>
            </div>

            {/* Form */}
            <form action={formAction} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        name="firstName"
                        label={isEn ? "First Name" : "الأسم الأول"}
                        placeholder={isEn ? "John" : "اكتب الاسم الأول"}
                        error={fieldErrors.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <AuthInput
                        name="lastName"
                        label={isEn ? "Last Name" : "الأسم الأخير"}
                        placeholder={isEn ? "Doe" : "اكتب الاسم الأخير"}
                        error={fieldErrors.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        type="email"
                        name="email"
                        label={isEn ? "Email Address" : "البريد الإلكتروني"}
                        placeholder="example@email.com"
                        error={fieldErrors.email}
                        onChange={handleInputChange}
                        required
                    />
                    <AuthInput
                        name="phone"
                        label={isEn ? "Phone Number" : "رقم الهاتف"}
                        placeholder="+201000000000"
                        error={fieldErrors.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        name="country"
                        label={isEn ? "Country" : "الدولة"}
                        placeholder="Egypt"
                        error={fieldErrors.country}
                        onChange={handleInputChange}
                        required
                    />
                    <AuthInput
                        name="city"
                        label={isEn ? "City" : "المدينة"}
                        placeholder="Cairo"
                        error={fieldErrors.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <AuthInput
                    name="address"
                    label={isEn ? "Detailed Address" : "العنوان"}
                    placeholder={isEn ? "Street, Building..." : "شارع الجمهورية، عمارة 5..."}
                    error={fieldErrors.address}
                    onChange={handleInputChange}
                    required
                />

                <AuthInput
                    type="password"
                    name="password"
                    label={isEn ? "Password" : "كلمة المرور"}
                    placeholder="••••••••"
                    error={fieldErrors.password}
                    onChange={handleInputChange}
                    required
                />

                <Button
                    disabled={loading}
                    type="submit"
                    className="gradient-button flex w-full h-14 items-center justify-center gap-2 rounded-2xl text-base font-semibold shadow-lg transition-all duration-300 hover:opacity-9"
                >
                    <BsPersonPlus size={20} />
                    <span>
                        {loading
                            ? (isEn ? "Creating account..." : "جاري إنشاء الحساب...")
                            : (isEn ? "Register New Account" : "تسجيل حساب جديد")}
                    </span>
                </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-text-secondary">
                {isEn ? "Already have an account?" : "لديك حساب بالفعل؟"}
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

export default RegisterForm;
