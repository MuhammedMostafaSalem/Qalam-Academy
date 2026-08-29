"use client";

import { useEffect, useMemo, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { updatePlatformThemeAction } from "@/actions/themeActions";
import {
    PALETTE_KEYS,
    isHexColor,
    normalizeHexColor,
    normalizePalettePair,
} from "@/constants/theme";
import { getContrastLabel, getContrastRatio } from "@/utils/theme";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import useToast from "@/hooks/useToast";

const LABELS = {
    primary: { en: "Primary", ar: "الأساسي" },
    secondary: { en: "Secondary", ar: "الثانوي" },
    accent: { en: "Accent", ar: "الإبراز" },
    background: { en: "Background", ar: "الخلفية" },
    surface: { en: "Surface", ar: "السطح" },
    text: { en: "Text", ar: "النص" },
    mutedText: { en: "Muted text", ar: "النص الثانوي" },
    border: { en: "Border", ar: "الحدود" },
    success: { en: "Success", ar: "النجاح" },
    warning: { en: "Warning", ar: "التحذير" },
    danger: { en: "Danger", ar: "الخطر" },
};

const ThemeSettingsForm = () => {
    const { language } = useLanguage();
    const { palettes, replacePalettes, refreshPalettes, isLoadingPalette } = useTheme();
    const { successMessage, errorMessage } = useToast();
    const isEnglish = language === "en";
    const [draft, setDraft] = useState(() => normalizePalettePair(palettes));
    const [savedDraft, setSavedDraft] = useState(() => normalizePalettePair(palettes));
    const [activeMode, setActiveMode] = useState("dark");
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const normalized = normalizePalettePair(palettes);
        setDraft(normalized);
        setSavedDraft(normalized);
    }, [palettes]);

    useEffect(() => {
        refreshPalettes();
    }, [refreshPalettes]);

    const activePalette = draft[activeMode];
    const contrastChecks = useMemo(() => {
        const palette = draft[activeMode];
        const pairs = [
            ["text/background", palette.text, palette.background],
            ["text/surface", palette.text, palette.surface],
            ["mutedText/background", palette.mutedText, palette.background],
            ["mutedText/surface", palette.mutedText, palette.surface],
        ];

        return pairs.map(([name, foreground, background]) => ({
            name,
            ratio: getContrastRatio(foreground, background),
        }));
    }, [activeMode, draft]);

    const updateColor = (key, value) => {
        setDraft((current) => ({
            ...current,
            [activeMode]: {
                ...current[activeMode],
                [key]: value,
            },
        }));
        setErrors((current) => ({ ...current, [`${activeMode}.${key}`]: null }));
    };

    const validate = () => {
        const nextErrors = {};

        ["light", "dark"].forEach((mode) => {
            PALETTE_KEYS.forEach((key) => {
                if (!isHexColor(draft[mode]?.[key])) {
                    nextErrors[`${mode}.${key}`] = isEnglish
                        ? "Use a valid hex color, for example #2563EB"
                        : "استخدم رمز لون HEX صالحًا مثل #2563EB";
                }
            });

            const palette = draft[mode];
            [
                ["text", "background"],
                ["text", "surface"],
                ["mutedText", "background"],
                ["mutedText", "surface"],
            ].forEach(([foreground, background]) => {
                const ratio = getContrastRatio(palette?.[foreground], palette?.[background]);
                if (ratio === null || ratio < 4.5) {
                    nextErrors[`${mode}._contrast`] = isEnglish
                        ? "Text contrast must be at least 4.5:1"
                        : "يجب ألا يقل تباين النص عن 4.5:1";
                }
            });
        });

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        setIsPending(true);
        const payload = normalizePalettePair({
            light: Object.fromEntries(PALETTE_KEYS.map((key) => [key, normalizeHexColor(draft.light[key], draft.light[key])])),
            dark: Object.fromEntries(PALETTE_KEYS.map((key) => [key, normalizeHexColor(draft.dark[key], draft.dark[key])])),
        });

        try {
            const result = await updatePlatformThemeAction(payload);
            if (!result.success || !result.data) {
                errorMessage(result.message || (isEnglish ? "Failed to save theme" : "فشل حفظ الألوان"));
                return;
            }

            const normalized = normalizePalettePair(result.data);
            replacePalettes(normalized);
            setDraft(normalized);
            setSavedDraft(normalized);
            successMessage(result.message || (isEnglish ? "Theme saved successfully" : "تم حفظ الألوان بنجاح"));
        } catch (error) {
            errorMessage(error?.message || (isEnglish ? "Failed to save theme" : "فشل حفظ الألوان"));
        } finally {
            setIsPending(false);
        }
    };

    const resetDraft = () => {
        setDraft(normalizePalettePair(savedDraft));
        setErrors({});
    };

    const title = isEnglish ? "Theme colors" : "ألوان المظهر";
    const description = isEnglish
        ? "Configure the complete light and dark palettes used across the platform."
        : "اضبط لوحتي الألوان الفاتحة والداكنة المستخدمتين في المنصة.";

    return (
        <section className="mt-8 rounded-2xl border border-border bg-card p-6" aria-labelledby="theme-settings-title">
            <div className="mb-6">
                <h3 id="theme-settings-title" className="text-lg font-bold text-text-primary">{title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{description}</p>
            </div>

            {isLoadingPalette ? (
                <p className="py-8 text-center text-text-secondary">
                    {isEnglish ? "Loading theme colors..." : "جاري تحميل ألوان المظهر..."}
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label={isEnglish ? "Theme mode" : "وضع المظهر"}>
                        {["light", "dark"].map((mode) => (
                            <button
                                key={mode}
                                type="button"
                                role="tab"
                                aria-selected={activeMode === mode}
                                onClick={() => setActiveMode(mode)}
                                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${activeMode === mode ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:border-primary"}`}
                            >
                                {mode === "light" ? (isEnglish ? "Light palette" : "الوضع الفاتح") : (isEnglish ? "Dark palette" : "الوضع الداكن")}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {PALETTE_KEYS.map((key) => {
                            const value = activePalette[key];
                            const fieldError = errors[`${activeMode}.${key}`];
                            const colorValue = isHexColor(value) ? normalizeHexColor(value, "#000000") : "#000000";

                            return (
                                <div key={key}>
                                    <label htmlFor={`theme-${activeMode}-${key}`} className="mb-2 block text-sm font-medium text-text-secondary">
                                        {LABELS[key][isEnglish ? "en" : "ar"]}
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={colorValue}
                                            aria-label={`${LABELS[key].en} color picker`}
                                            onChange={(event) => updateColor(key, event.target.value.toUpperCase())}
                                            className="h-12 w-14 cursor-pointer rounded-xl border border-border bg-background p-1"
                                        />
                                        <input
                                            id={`theme-${activeMode}-${key}`}
                                            type="text"
                                            value={value}
                                            onChange={(event) => updateColor(key, event.target.value.toUpperCase())}
                                            maxLength={7}
                                            spellCheck={false}
                                            dir="ltr"
                                            className={`min-w-0 flex-1 rounded-xl border bg-background px-3 font-mono text-sm text-text-primary outline-none transition focus:border-primary ${fieldError ? "border-error" : "border-border"}`}
                                        />
                                    </div>
                                    {fieldError && <p className="mt-1 text-xs text-error">{fieldError}</p>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-4">
                        <h4 className="mb-3 font-semibold text-text-primary">
                            {isEnglish ? "Contrast checks" : "فحص التباين"}
                        </h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {contrastChecks.map(({ name, ratio }) => {
                                const readable = ratio !== null && ratio >= 4.5;
                                return (
                                    <div key={name} className="flex items-center justify-between gap-3 text-sm">
                                        <span className="font-mono text-text-secondary">{name}</span>
                                        <span className={`inline-flex items-center gap-1 ${readable ? "text-success" : "text-warning"}`}>
                                            {readable ? <HiOutlineCheckCircle aria-hidden="true" /> : <HiOutlineExclamationTriangle aria-hidden="true" />}
                                            {ratio === null ? "—" : `${ratio.toFixed(2)}:1 (${getContrastLabel(ratio, isEnglish)})`}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        {errors[`${activeMode}._contrast`] && (
                            <p className="mt-3 text-sm text-warning">{errors[`${activeMode}._contrast`]}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {["light", "dark"].map((mode) => {
                            const palette = draft[mode];
                            return (
                                <div key={mode} className="rounded-2xl border p-5" style={{ background: palette.background, color: palette.text, borderColor: palette.border }}>
                                    <p className="mb-3 text-sm font-semibold" style={{ color: palette.mutedText }}>
                                        {mode === "light" ? (isEnglish ? "Light preview" : "معاينة الوضع الفاتح") : (isEnglish ? "Dark preview" : "معاينة الوضع الداكن")}
                                    </p>
                                    <div className="rounded-xl p-4" style={{ background: palette.surface, border: `1px solid ${palette.border}` }}>
                                        <p className="font-bold">{isEnglish ? "Qalam Academy" : "أكاديمية قلم"}</p>
                                        <p className="mt-1 text-sm" style={{ color: palette.mutedText }}>{isEnglish ? "Readable themed content preview" : "معاينة لمحتوى واضح حسب المظهر"}</p>
                                        <button type="button" className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: palette.primary, color: palette.background }}>
                                            {isEnglish ? "Primary action" : "إجراء أساسي"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap justify-end gap-3 pt-2">
                        <button type="button" onClick={resetDraft} disabled={isPending} className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-primary disabled:opacity-60">
                            {isEnglish ? "Reset" : "إعادة تعيين"}
                        </button>
                        <button type="submit" disabled={isPending} className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60">
                            {isPending ? (isEnglish ? "Saving..." : "جاري الحفظ...") : (isEnglish ? "Save theme colors" : "حفظ ألوان المظهر")}
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default ThemeSettingsForm;
