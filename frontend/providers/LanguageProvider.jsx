"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { getLocalizedValue, getUITranslation } from "@/utils/localization";
import { useRouter } from "next/navigation";

const LanguageContext = createContext({
    language: "ar",
    dir: "rtl",
    isRtl: true,
    setLanguage: () => {},
    toggleLanguage: () => {},
    localize: (val, fallback = "") => getLocalizedValue(val, "ar", fallback),
    t: (key, fallback = "") => getUITranslation(key, "ar", fallback),
});

export const LanguageProvider = ({ children, initialLang = "ar" }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [language, setLanguageState] = useState(initialLang);

    const dir = language === "ar" ? "rtl" : "ltr";
    const isRtl = language === "ar";

    useEffect(() => {
        // Sync document attributes with active language
        document.documentElement.lang = language;
        document.documentElement.dir = dir;
    }, [language, dir]);

    const setLanguage = (newLang) => {
        const targetLang = newLang === "en" ? "en" : "ar";
        setLanguageState(targetLang);

        // Set cookies with 1 year expiry for both client and server actions
        document.cookie = `NEXT_LOCALE=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;
        document.cookie = `NEXT_LANG=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;

        document.documentElement.lang = targetLang;
        document.documentElement.dir = targetLang === "ar" ? "rtl" : "ltr";

        startTransition(() => {
            router.refresh();
        });
    };

    const toggleLanguage = () => {
        const nextLang = language === "ar" ? "en" : "ar";
        setLanguage(nextLang);
    };

    const localize = (value, fallback = "") => {
        return getLocalizedValue(value, language, fallback);
    };

    const t = (key, fallback = "") => {
        return getUITranslation(key, language, fallback);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                dir,
                isRtl,
                setLanguage,
                toggleLanguage,
                localize,
                t,
                isPending,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

export default LanguageProvider;
