"use client";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";

const ThemeToggle = ({ compact = false }) => {
    const { language } = useLanguage();
    const { isDark, isChangingMode, toggleTheme } = useTheme();
    const isEnglish = language === "en";
    const nextModeLabel = isDark
        ? (isEnglish ? "Switch to light mode" : "التبديل إلى الوضع الفاتح")
        : (isEnglish ? "Switch to dark mode" : "التبديل إلى الوضع الداكن");

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={nextModeLabel}
            title={nextModeLabel}
            aria-busy={isChangingMode}
            disabled={isChangingMode}
            onClick={toggleTheme}
            className={`
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-border
                text-text-primary
                transition-colors
                duration-200
                hover:border-primary
                hover:bg-card
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                disabled:cursor-wait
                disabled:opacity-60
                ${compact ? "h-10 w-10" : "h-11 w-11"}
            `}
        >
            {isDark ? <HiOutlineSun size={20} aria-hidden="true" /> : <HiOutlineMoon size={20} aria-hidden="true" />}
            <span className="sr-only">{nextModeLabel}</span>
        </button>
    );
};

export default ThemeToggle;
