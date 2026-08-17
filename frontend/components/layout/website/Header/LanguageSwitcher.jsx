"use client";

import { useEffect, useState } from "react";
import { MdOutlineLanguage } from "react-icons/md";
import { animations } from "@/lib/animations";
import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
    const router = useRouter();
    const [currentLang, setCurrentLang] = useState("ar");

    useEffect(() => {
        const cookies = document.cookie.split("; ");
        const localeCookie = cookies.find((c) => c.startsWith("NEXT_LOCALE=") || c.startsWith("NEXT_LANG="));
        if (localeCookie) {
            const val = localeCookie.split("=")[1];
            if (val === "en" || val === "ar") {
                setCurrentLang(val);
                document.documentElement.dir = val === "ar" ? "rtl" : "ltr";
                document.documentElement.lang = val;
            }
        }
    }, []);

    const toggleLanguage = () => {
        const nextLang = currentLang === "ar" ? "en" : "ar";
        setCurrentLang(nextLang);

        // Set cookies for client & server
        document.cookie = `NEXT_LOCALE=${nextLang}; path=/; max-age=31536000`;
        document.cookie = `NEXT_LANG=${nextLang}; path=/; max-age=31536000`;

        document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = nextLang;

        router.refresh();
        window.location.reload();
    };

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Change Language"
            className={`
                flex
                flex-row-reverse
                items-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                text-text-primary
                ${animations.transition}
                hover:text-primary
                hover:scale-105
            `}
        >
            <MdOutlineLanguage size={18} />
            <span>{currentLang === "ar" ? "EN" : "عربي"}</span>
        </button>
    );
};

export default LanguageSwitcher;