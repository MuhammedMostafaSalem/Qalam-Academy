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

const RegisterForm = () => {
    const {
        formData,
        loading,
        error,
        message,
        fieldErrors,
        handleChange,
        handleSubmit,
    } = useRegisterForm();

    return (
        <AuthCard
            className="w-full max-w-xl rounded-[28px] border border-border bg-card p-5 sm:p-6 shadow-xl"
        >
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-2 mb-8">
                <SectionTitle className="text-2xl sm:text-3xl font-bold">
                    انشاء حساب جديد
                </SectionTitle>
                <SectionDescription className="text-sm text-text-secondary">
                    املأ البيانات التالية لانضمامك إلى منصة Qalam Academy
                </SectionDescription>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* الاسم الأول والأخير بجانب بعضهما في الشاشات المتوسطة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        name="firstName"
                        label="الأسم الأول"
                        placeholder="اكتب الاسم الأول"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={fieldErrors.firstName}
                    />
                    <AuthInput
                        name="lastName"
                        label="الأسم الأخير"
                        placeholder="اكتب الاسم الأخير"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={fieldErrors.lastName}
                    />
                </div>

                {/* البريد والهاتف */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        type="email"
                        name="email"
                        label="البريد الإلكتروني"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={fieldErrors.email}
                    />
                    <AuthInput
                        name="phone"
                        label="رقم الهاتف"
                        placeholder="+201000000000"
                        value={formData.phone}
                        onChange={handleChange}
                        error={fieldErrors.phone}
                    />
                </div>

                {/* الدولة والمدينة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        name="country"
                        label="الدولة"
                        placeholder="Egypt"
                        value={formData.country}
                        onChange={handleChange}
                        error={fieldErrors.country}
                    />
                    <AuthInput
                        name="city"
                        label="المدينة"
                        placeholder="Cairo"
                        value={formData.city}
                        onChange={handleChange}
                        error={fieldErrors.city}
                    />
                </div>

                {/* العنوان بالتفصيل */}
                <AuthInput
                    name="address"
                    label="العنوان"
                    placeholder="شارع الجمهورية، عمارة 5..."
                    value={formData.address}
                    onChange={handleChange}
                    error={fieldErrors.address}
                />

                {/* كلمة المرور وتأكيدها */}
                <AuthInput
                    type="password"
                    name="password"
                    label="كلمة المرور"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={fieldErrors.password}
                />

                <Button
                    disabled={loading}
                    type="submit"
                    className="gradient-button flex w-full h-14 items-center justify-center gap-2 rounded-2xl text-base font-semibold shadow-lg transition-all duration-300 hover:opacity-9"
                >
                    <BsPersonPlus size={20} />
                    <span>
                        {loading ? "جاري إنشاء الحساب..." : "تسجيل حساب جديد"}
                    </span>
                </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-text-secondary">
                لديك حساب بالفعل؟
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

export default RegisterForm;