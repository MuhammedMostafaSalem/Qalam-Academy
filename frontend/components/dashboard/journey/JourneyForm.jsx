"use client";

import { useCallback, useEffect, useState } from "react";
import { getJourneyAction, updateJourneyAction } from "@/actions/journeyActions";
import { useLanguage } from "@/providers/LanguageProvider";
import useToast from "@/hooks/useToast";

const EMPTY_FORM = {
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    badgeAr: "",
    badgeEn: "",
    badgeDescriptionAr: "",
    badgeDescriptionEn: "",
    isActive: true,
};

const FIELD_GROUPS = [
    { key: "title", labelEn: "Section title", labelAr: "عنوان القسم", multiline: false },
    { key: "description", labelEn: "Journey description", labelAr: "وصف الرحلة", multiline: true },
    { key: "badge", labelEn: "Badge title", labelAr: "عنوان الشارة", multiline: false },
    { key: "badgeDescription", labelEn: "Badge description", labelAr: "وصف الشارة", multiline: true },
];

export default function JourneyForm() {
    const { language } = useLanguage();
    const { successMessage, errorMessage } = useToast();
    const isEnglish = language === "en";
    const [form, setForm] = useState(EMPTY_FORM);
    const [currentImage, setCurrentImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadJourney = useCallback(async () => {
        setLoading(true);
        const result = await getJourneyAction(true);
        if (result.success && result.data) {
            const journey = result.data;
            setForm({
                titleAr: journey.title?.ar || "",
                titleEn: journey.title?.en || "",
                descriptionAr: journey.description?.ar || "",
                descriptionEn: journey.description?.en || "",
                badgeAr: journey.badge?.ar || "",
                badgeEn: journey.badge?.en || "",
                badgeDescriptionAr: journey.badgeDescription?.ar || "",
                badgeDescriptionEn: journey.badgeDescription?.en || "",
                isActive: journey.isActive !== false,
            });
            setCurrentImage(journey.image || null);
        } else {
            errorMessage(result.message || (isEnglish ? "Unable to load journey content" : "تعذر تحميل بيانات الرحلة"));
        }
        setLoading(false);
    }, [errorMessage, isEnglish]);

    useEffect(() => {
        loadJourney();
    }, [loadJourney]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, String(value)));
        const image = event.currentTarget.elements.image?.files?.[0];
        if (image) data.append("image", image);

        const result = await updateJourneyAction(null, data);
        if (result.success) {
            successMessage(result.message || (isEnglish ? "Journey content updated" : "تم تحديث بيانات الرحلة"));
            await loadJourney();
        } else {
            const validationMessage = Object.values(result.errors || {}).find(Boolean);
            errorMessage(validationMessage || result.message || (isEnglish ? "Unable to update journey content" : "تعذر تحديث بيانات الرحلة"));
        }
        setSaving(false);
    };

    if (loading) {
        return <p className="py-12 text-center text-text-secondary">{isEnglish ? "Loading journey content..." : "جاري تحميل بيانات الرحلة..."}</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {FIELD_GROUPS.map((field) => (
                <section key={field.key} className="rounded-2xl border border-border bg-card p-5">
                    <h2 className="mb-4 font-bold text-text-primary">
                        {isEnglish ? field.labelEn : field.labelAr}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[{ suffix: "Ar", label: isEnglish ? "Arabic" : "العربية", dir: "rtl" }, { suffix: "En", label: isEnglish ? "English" : "الإنجليزية", dir: "ltr" }].map((locale) => {
                            const name = `${field.key}${locale.suffix}`;
                            const commonProps = {
                                name,
                                value: form[name],
                                onChange: handleChange,
                                required: true,
                                minLength: 2,
                                maxLength: 3000,
                                dir: locale.dir,
                                className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary",
                            };

                            return (
                                <label key={name} className="block text-sm text-text-secondary">
                                    <span className="mb-2 block">{locale.label}</span>
                                    {field.multiline
                                        ? <textarea {...commonProps} rows={5} />
                                        : <input {...commonProps} type="text" />}
                                </label>
                            );
                        })}
                    </div>
                </section>
            ))}

            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="mb-4 font-bold text-text-primary">{isEnglish ? "Image and visibility" : "الصورة والظهور"}</h2>
                {currentImage && (
                    <img src={currentImage} alt="Journey" className="mb-4 h-40 w-full max-w-sm rounded-2xl object-cover" />
                )}
                <input name="image" type="file" accept="image/*" className="block w-full text-sm text-text-secondary file:me-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-white" />
                <label className="mt-5 flex items-center gap-2 text-sm text-text-primary">
                    <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} className="h-4 w-4" />
                    {isEnglish ? "Show the journey section on the website" : "إظهار قسم الرحلة في الموقع"}
                </label>
            </section>

            <div className="flex justify-end">
                <button type="submit" disabled={saving} className="gradient-button rounded-xl px-7 py-3 font-bold text-white disabled:cursor-wait disabled:opacity-60">
                    {saving ? (isEnglish ? "Saving..." : "جاري الحفظ...") : (isEnglish ? "Save journey" : "حفظ الرحلة")}
                </button>
            </div>
        </form>
    );
}
