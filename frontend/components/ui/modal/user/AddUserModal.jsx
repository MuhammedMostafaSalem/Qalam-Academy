"use client";

import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { createUserByAdminAction } from "@/actions/userActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const EMPTY_FORM = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "student",
    isActive: true,
};

const inputClass = "h-12 w-full rounded-xl border border-border bg-background px-4 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const Field = ({ label, error, children }) => (
    <label className="block text-sm text-text-secondary">
        <span className="mb-2 block">{label}</span>
        {children}
        {error && <span className="mt-1.5 block text-xs text-error">{error}</span>}
    </label>
);

export default function AddUserModal({ isOpen, onClose, onSuccess }) {
    const { language } = useLanguage();
    const isEn = language === "en";
    const { successMessage, errorMessage } = useToast();
    const [form, setForm] = useState(EMPTY_FORM);
    const [fieldErrors, setFieldErrors] = useState({});
    const [saving, setSaving] = useState(false);

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (fieldErrors[name]) {
            setFieldErrors((current) => ({ ...current, [name]: null }));
        }
    };

    const closeModal = () => {
        if (saving) return;
        setForm(EMPTY_FORM);
        setFieldErrors({});
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.password !== form.confirmPassword) {
            setFieldErrors({
                confirmPassword: isEn ? "Passwords do not match" : "كلمتا المرور غير متطابقتين",
            });
            return;
        }

        setSaving(true);
        setFieldErrors({});

        const { confirmPassword, ...userData } = form;
        const result = await createUserByAdminAction(userData);

        if (result.success) {
            successMessage(result.message || (isEn ? "User created successfully" : "تم إنشاء المستخدم بنجاح"));
            setForm(EMPTY_FORM);
            onClose();
            if (onSuccess) await onSuccess();
        } else {
            setFieldErrors(result.errors || {});
            const validationMessage = Object.values(result.errors || {})
                .flat()
                .find((value) => typeof value === "string" && value);
            errorMessage(validationMessage || result.message || (isEn ? "Unable to create user" : "تعذر إنشاء المستخدم"));
        }

        setSaving(false);
    };

    const roles = [
        { value: "admin", en: "Admin", ar: "مسؤول" },
        { value: "instructor", en: "Instructor", ar: "محاضر" },
        { value: "student", en: "Student", ar: "طالب" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div role="dialog" aria-modal="true" aria-labelledby="add-user-title" className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl">
                <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    aria-label={isEn ? "Close" : "إغلاق"}
                    className="absolute top-5 text-text-secondary transition hover:text-text-primary disabled:opacity-50 rtl:left-5 ltr:right-5"
                >
                    <HiXMark size={24} />
                </button>

                <div className="mb-6 pe-10">
                    <h2 id="add-user-title" className="text-xl font-bold text-text-primary">
                        {isEn ? "Add New User" : "إضافة مستخدم جديد"}
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        {isEn
                            ? "Create a verified account and assign its dashboard role."
                            : "أنشئ حسابًا موثقًا وحدد دوره في المنصة."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label={isEn ? "First Name" : "الاسم الأول"} error={fieldErrors.firstName}>
                            <input name="firstName" value={form.firstName} onChange={handleChange} minLength="2" maxLength="30" required className={inputClass} />
                        </Field>
                        <Field label={isEn ? "Last Name" : "الاسم الأخير"} error={fieldErrors.lastName}>
                            <input name="lastName" value={form.lastName} onChange={handleChange} minLength="2" maxLength="30" required className={inputClass} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label={isEn ? "Email Address" : "البريد الإلكتروني"} error={fieldErrors.email}>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required dir="ltr" className={inputClass} placeholder="user@example.com" />
                        </Field>
                        <Field label={isEn ? "Phone Number" : "رقم الهاتف"} error={fieldErrors.phone}>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required dir="ltr" className={inputClass} placeholder="+201000000000" />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label={isEn ? "Country" : "الدولة"} error={fieldErrors.country}>
                            <input name="country" value={form.country} onChange={handleChange} minLength="2" maxLength="100" required className={inputClass} />
                        </Field>
                        <Field label={isEn ? "City" : "المدينة"} error={fieldErrors.city}>
                            <input name="city" value={form.city} onChange={handleChange} minLength="2" maxLength="100" required className={inputClass} />
                        </Field>
                    </div>

                    <Field label={isEn ? "Address" : "العنوان"} error={fieldErrors.address}>
                        <input name="address" value={form.address} onChange={handleChange} minLength="5" maxLength="300" required className={inputClass} />
                    </Field>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label={isEn ? "Password" : "كلمة المرور"} error={fieldErrors.password}>
                            <input type="password" name="password" value={form.password} onChange={handleChange} minLength="6" maxLength="20" required dir="ltr" className={inputClass} />
                        </Field>
                        <Field label={isEn ? "Confirm Password" : "تأكيد كلمة المرور"} error={fieldErrors.confirmPassword}>
                            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} minLength="6" maxLength="20" required dir="ltr" className={inputClass} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label={isEn ? "Role" : "الدور"} error={fieldErrors.role}>
                            <select name="role" value={form.role} onChange={handleChange} required className={inputClass}>
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value} className="bg-card text-text-primary">
                                        {isEn ? role.en : role.ar}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <div className="flex items-end">
                            <label className="flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-background px-4 text-sm text-text-primary">
                                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4 accent-primary" />
                                {isEn ? "Account is active" : "الحساب نشط"}
                            </label>
                        </div>
                    </div>

                    <p className="rounded-xl bg-primary/5 px-4 py-3 text-xs leading-5 text-text-secondary">
                        {isEn
                            ? "The account is verified immediately. The user can sign in with the password you set."
                            : "سيتم توثيق الحساب مباشرة، ويمكن للمستخدم تسجيل الدخول بكلمة المرور التي تحددها."}
                    </p>

                    <div className="flex justify-end gap-3 border-t border-border pt-5">
                        <button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border border-border px-5 py-2.5 font-medium text-text-primary transition hover:bg-background disabled:opacity-50">
                            {isEn ? "Cancel" : "إلغاء"}
                        </button>
                        <button type="submit" disabled={saving} className="gradient-button rounded-xl px-6 py-2.5 font-semibold text-white disabled:cursor-wait disabled:opacity-60">
                            {saving ? (isEn ? "Creating..." : "جاري الإنشاء...") : (isEn ? "Create User" : "إنشاء المستخدم")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
