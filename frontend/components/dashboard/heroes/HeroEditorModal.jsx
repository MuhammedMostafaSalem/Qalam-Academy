"use client";

import { useState } from "react";
import { HiOutlineArrowTopRightOnSquare, HiXMark } from "react-icons/hi2";
import { createHeroAction, updateHeroAction } from "@/actions/heroActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";
import { HERO_ALIGNMENT_OPTIONS, HERO_LAYOUT_OPTIONS } from "./heroPages";

const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-text-secondary";

function translationValue(hero, field, language) {
    const translated = hero?._translations?.[field];

    if (translated && typeof translated === "object") {
        return translated[language] || "";
    }

    const value = hero?.[field];
    if (value && typeof value === "object") {
        return value[language] || "";
    }

    return language === "ar" && typeof value === "string" ? value : "";
}

const BilingualField = ({ labelAr, labelEn, name, hero, textarea = false, required = false }) => {
    const Field = textarea ? "textarea" : "input";

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div>
                <label className={labelClass}>{labelAr}</label>
                <Field
                    name={`${name}Ar`}
                    type={textarea ? undefined : "text"}
                    rows={textarea ? 4 : undefined}
                    defaultValue={translationValue(hero, name, "ar")}
                    required={required}
                    className={`${inputClass} ${textarea ? "resize-y" : ""}`}
                    dir="rtl"
                />
            </div>
            <div>
                <label className={labelClass}>{labelEn}</label>
                <Field
                    name={`${name}En`}
                    type={textarea ? undefined : "text"}
                    rows={textarea ? 4 : undefined}
                    defaultValue={translationValue(hero, name, "en")}
                    required={required}
                    className={`${inputClass} ${textarea ? "resize-y" : ""}`}
                    dir="ltr"
                />
            </div>
        </div>
    );
};

const MediaField = ({ name, label, accept, currentValue, isEn }) => (
    <div>
        <label className={labelClass}>{label}</label>
        {currentValue && (
            <a
                href={currentValue}
                target="_blank"
                rel="noreferrer"
                className="mb-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
                {isEn ? "View current file" : "عرض الملف الحالي"}
                <HiOutlineArrowTopRightOnSquare />
            </a>
        )}
        <input
            name={name}
            type="file"
            accept={accept}
            className="block w-full rounded-xl border border-border bg-background p-2 text-sm text-text-secondary file:me-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-white"
        />
    </div>
);

const HeroEditorModal = ({ pageConfig, hero, onClose, onSuccess }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const isEditing = Boolean(hero?._id);
    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    if (!pageConfig) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        formData.set("page", pageConfig.page);
        formData.set("isActive", formData.has("isActive") ? "true" : "false");

        const result = isEditing
            ? await updateHeroAction(hero._id, null, formData)
            : await createHeroAction(null, formData);

        setIsPending(false);

        if (result.success) {
            successMessage(
                result.message || (isEn ? "Hero saved successfully" : "تم حفظ الهيرو بنجاح")
            );
            onSuccess();
        } else {
            errorMessage(
                result.message || (isEn ? "Failed to save hero" : "فشل حفظ الهيرو")
            );
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm"
            onMouseDown={onClose}
        >
            <div
                className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-2xl md:p-7"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={isEn ? "Close" : "إغلاق"}
                    className="absolute end-5 top-5 rounded-xl p-2 text-text-secondary transition hover:bg-background hover:text-text-primary"
                >
                    <HiXMark size={24} />
                </button>

                <div className="pe-12">
                    <p className="text-sm font-medium text-primary">{localize(pageConfig.label)}</p>
                    <h2 className="mt-1 text-2xl font-bold text-text-primary">
                        {isEditing
                            ? (isEn ? "Edit page hero" : "تعديل هيرو الصفحة")
                            : (isEn ? "Create page hero" : "إنشاء هيرو الصفحة")}
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        {isEn
                            ? "Arabic and English content is saved together. Empty optional fields remove their current text."
                            : "يتم حفظ المحتوى العربي والإنجليزي معًا، وترك الحقول الاختيارية فارغة يحذف نصها الحالي."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-7">
                    <input type="hidden" name="page" value={pageConfig.page} />

                    <fieldset className="space-y-4 rounded-2xl border border-border p-4 md:p-5">
                        <legend className="px-2 font-semibold text-text-primary">
                            {isEn ? "Main content" : "المحتوى الرئيسي"}
                        </legend>
                        <BilingualField
                            name="title"
                            labelAr="العنوان بالعربية"
                            labelEn="Title in English"
                            hero={hero}
                            required
                        />
                        <BilingualField
                            name="subtitle"
                            labelAr="العنوان الفرعي بالعربية"
                            labelEn="Subtitle in English"
                            hero={hero}
                        />
                        <BilingualField
                            name="description"
                            labelAr="الوصف بالعربية"
                            labelEn="Description in English"
                            hero={hero}
                            textarea
                        />
                    </fieldset>

                    <fieldset className="space-y-4 rounded-2xl border border-border p-4 md:p-5">
                        <legend className="px-2 font-semibold text-text-primary">
                            {isEn ? "Call-to-action buttons" : "أزرار الدعوة للإجراء"}
                        </legend>
                        <BilingualField
                            name="buttonText"
                            labelAr="نص الزر الرئيسي بالعربية"
                            labelEn="Primary button text"
                            hero={hero}
                        />
                        <div>
                            <label className={labelClass}>{isEn ? "Primary button link" : "رابط الزر الرئيسي"}</label>
                            <input name="buttonLink" type="text" defaultValue={hero?.buttonLink || ""} placeholder="/courses" className={inputClass} dir="ltr" />
                        </div>
                        <BilingualField
                            name="secondaryButtonText"
                            labelAr="نص الزر الثانوي بالعربية"
                            labelEn="Secondary button text"
                            hero={hero}
                        />
                        <div>
                            <label className={labelClass}>{isEn ? "Secondary button link" : "رابط الزر الثانوي"}</label>
                            <input name="secondaryButtonLink" type="text" defaultValue={hero?.secondaryButtonLink || ""} placeholder="/about" className={inputClass} dir="ltr" />
                        </div>
                    </fieldset>

                    <fieldset className="space-y-4 rounded-2xl border border-border p-4 md:p-5">
                        <legend className="px-2 font-semibold text-text-primary">
                            {isEn ? "Media" : "الوسائط"}
                        </legend>
                        <div className="grid gap-4 md:grid-cols-3">
                            <MediaField name="image" label={isEn ? "Hero image" : "صورة الهيرو"} accept="image/*" currentValue={hero?.image} isEn={isEn} />
                            <MediaField name="backgroundImage" label={isEn ? "Background image" : "صورة الخلفية"} accept="image/*" currentValue={hero?.backgroundImage} isEn={isEn} />
                            <MediaField name="video" label={isEn ? "Hero video" : "فيديو الهيرو"} accept="video/*" currentValue={hero?.video} isEn={isEn} />
                        </div>
                    </fieldset>

                    <fieldset className="space-y-4 rounded-2xl border border-border p-4 md:p-5">
                        <legend className="px-2 font-semibold text-text-primary">
                            {isEn ? "Display settings" : "إعدادات العرض"}
                        </legend>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className={labelClass}>{isEn ? "Layout" : "التخطيط"}</label>
                                <select name="layout" defaultValue={hero?.layout || "center"} className={inputClass}>
                                    {HERO_LAYOUT_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>{isEn ? "Text alignment" : "محاذاة النص"}</label>
                                <select name="textAlignment" defaultValue={hero?.textAlignment || "left"} className={inputClass}>
                                    {HERO_ALIGNMENT_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>{isEn ? "Sort order" : "ترتيب العرض"}</label>
                                <input name="sortOrder" type="number" min="1" defaultValue={hero?.sortOrder || 1} className={inputClass} />
                            </div>
                        </div>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-background p-3 text-sm text-text-primary">
                            <input name="isActive" type="checkbox" value="true" defaultChecked={hero?.isActive ?? true} className="h-5 w-5 accent-primary" />
                            <span>{isEn ? "Active and visible on the public page" : "نشط ويظهر في الصفحة العامة"}</span>
                        </label>
                    </fieldset>

                    <fieldset className="space-y-4 rounded-2xl border border-border p-4 md:p-5">
                        <legend className="px-2 font-semibold text-text-primary">SEO</legend>
                        <div>
                            <label className={labelClass}>{isEn ? "SEO title" : "عنوان محركات البحث"}</label>
                            <input name="seoTitle" type="text" maxLength={200} defaultValue={hero?.seoTitle || ""} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>{isEn ? "SEO description" : "وصف محركات البحث"}</label>
                            <textarea name="seoDescription" rows={3} maxLength={500} defaultValue={hero?.seoDescription || ""} className={`${inputClass} resize-y`} />
                        </div>
                    </fieldset>

                    <div className="sticky bottom-0 flex justify-end gap-3 border-t border-border bg-card/95 py-4 backdrop-blur">
                        <button type="button" onClick={onClose} disabled={isPending} className="rounded-xl border border-border px-5 py-2.5 font-medium text-text-primary transition hover:bg-background disabled:opacity-50">
                            {isEn ? "Cancel" : "إلغاء"}
                        </button>
                        <button type="submit" disabled={isPending} className="gradient-button rounded-xl px-6 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">
                            {isPending
                                ? (isEn ? "Saving..." : "جاري الحفظ...")
                                : (isEn ? "Save hero" : "حفظ الهيرو")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HeroEditorModal;
