"use client";

import { MdOutlineLanguage } from "react-icons/md";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

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
            <span>{language === "ar" ? "EN" : "عربي"}</span>
        </button>
    );
};

export default LanguageSwitcher;