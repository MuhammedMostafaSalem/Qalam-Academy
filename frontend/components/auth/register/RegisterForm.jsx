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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const RegisterForm = () => {
    // const { language } = useLanguage();
    const { settings } = usePlatformSettings();
    // const isEn = language === "en";

    const {
        formAction,
        loading,
        fieldErrors,
        handleInputChange,
        handlePhoneChange,
        formData,
        isEn
    } = useRegisterForm();

    console.log("formData.phone:", formData.phone);

    /**
     * Shared classes
     * Same design as AuthInput
     */
    const inputClasses = `
        !h-14
        !w-full
        !rounded-2xl
        !border
        !bg-background-alt
        !px-5
        !text-text-primary
        !outline-none
        !transition-all
        !duration-300
        focus:!border-primary
        focus:!ring-2
        focus:!ring-primary/20
    `;

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
                        value={formData.firstName}
                        required
                    />
                    <AuthInput
                        name="lastName"
                        label={isEn ? "Last Name" : "الأسم الأخير"}
                        placeholder={isEn ? "Doe" : "اكتب الاسم الأخير"}
                        error={fieldErrors.lastName}
                        onChange={handleInputChange}
                        value={formData.lastName}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        // type="text"
                        name="email"
                        label={isEn ? "Email Address" : "البريد الإلكتروني"}
                        placeholder="example@email.com"
                        error={fieldErrors.email}
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                    />
                    {/* <AuthInput
                        name="phone"
                        label={isEn ? "Phone Number" : "رقم الهاتف"}
                        placeholder="+201000000000"
                        error={fieldErrors.phone}
                        onChange={handleInputChange}
                        value={formData.phone}
                        required
                    /> */}
                    
                    <div className="w-full">
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium"
                    >
                        {isEn
                            ? "Phone Number"
                            : "رقم الهاتف"}
                    </label>

                    <style>
                        {`
                            .phone-country-button .selected-flag:hover,
                            .phone-country-button .selected-flag:focus,
                            .phone-country-button.open .selected-flag,
                            .react-tel-input .country-list .search-box {
                                background-color: transparent !important;
                            }

                            .phone-country-button .selected-flag {
                                padding: 0 8px;
                            }

                            .react-tel-input .selected-flag .arrow {
                                right: 22px;
                            }

                            .react-tel-input .country-list .search {
                                background-color: var(--color-card);
                                display: flex;
                                gap: 10px;
                            }

                            .react-tel-input .country-list .search-box {
                                width: 90%;
                                border-radius: 10px;
                                border-color: var(--color-border) !important;
                            }

                            .react-tel-input .country-list .country:hover,
                            .react-tel-input .country-list .country.highlight {
                                background-color: var(--color-primary) !important;
                            }

                            .react-tel-input .country-list .country {
                                display: flex;
                                gap: 1px;
                                align-items: center;
                                flex-direction: row;
                            }
                            .react-tel-input .country-list .country .dial-code {
                                color: unset;
                            }

                            .react-tel-input .country-list .flag {
                                margin: 2px 15px 0;
                            }

                            .react-tel-input .country-list {
                                width: 250px;
                            }

                            .react-tel-input .form-control {
                                border-color: var(--color-border) !important;
                            }
                        `}
                    </style>

                    <PhoneInput
                        country="eg"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        enableSearch
                        searchPlaceholder={
                            isEn
                                ? "Search country..."
                                : "ابحث عن الدولة..."
                        }
                        inputProps={{
                            name: "phone",
                            id: "phone",
                            required: true,
                        }}
                        placeholder="+20 100 000 0000"

                        /*
                         * Container
                         */
                        containerClass="
                            !relative
                            !w-full
                        "

                        /*
                         * Input
                         */
                        inputClass={`
                            ${inputClasses}

                            ${
                                isEn
                                    ? "!pl-[60px] !pr-5"
                                    : "!pr-[60px] !pl-5"
                            }
                        `}

                        /*
                         * Country selector
                         */
                        buttonClass={`
                            phone-country-button
                            !absolute
                            !top-0
                            !z-10
                            !h-14
                            !border
                            !border-border
                            !bg-transparent
                            !shadow-none

                            ${
                                isEn
                                    ? "!left-0 !right-auto !rounded-l-2xl !rounded-r-none"
                                    : "!right-0 !left-auto !rounded-r-2xl !rounded-l-none"
                            }

                            hover:!bg-transparent
                            focus:!bg-transparent
                        `}

                        /*
                         * Country dropdown
                         */
                        dropdownClass="
                            !z-50
                            !mt-1
                            !rounded-xl
                            !border
                            !border-border
                            !bg-card
                            !text-text-primary
                            !shadow-lg
                        "
                    />

                    {fieldErrors.phone && (
                        <p className="mt-1.5 text-sm text-error">
                            {fieldErrors.phone}
                        </p>
                    )}
                </div>



                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AuthInput
                        name="country"
                        label={isEn ? "Country" : "الدولة"}
                        placeholder="Egypt"
                        error={fieldErrors.country}
                        onChange={handleInputChange}
                        value={formData.country}
                        required
                    />
                    <AuthInput
                        name="city"
                        label={isEn ? "City" : "المدينة"}
                        placeholder="Cairo"
                        error={fieldErrors.city}
                        onChange={handleInputChange}
                        value={formData.city}
                        required
                    />
                </div>

                <AuthInput
                    name="address"
                    label={isEn ? "Detailed Address" : "العنوان"}
                    placeholder={isEn ? "Street, Building..." : "شارع الجمهورية، عمارة 5..."}
                    error={fieldErrors.address}
                    onChange={handleInputChange}
                    value={formData.address}
                    required
                />

                <AuthInput
                    type="password"
                    name="password"
                    label={isEn ? "Password" : "كلمة المرور"}
                    placeholder="••••••••"
                    error={fieldErrors.password}
                    onChange={handleInputChange}
                    value={formData.password}
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
