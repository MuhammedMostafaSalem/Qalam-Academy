"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePlatformSettings } from "@/providers/SettingsProvider";

const normalizeWhatsAppNumber = (value) => {
    let digits = String(value || "").replace(/\D/g, "");
    if (digits.startsWith("00")) digits = digits.slice(2);
    if (digits.startsWith("0")) digits = `20${digits.slice(1)}`;
    return digits;
};

export default function WhatsAppButton() {
    const { settings } = usePlatformSettings();
    const { language } = useLanguage();
    const number = normalizeWhatsAppNumber(settings.whatsapp);

    if (!number) return null;

    const label = language === "en" ? "Chat with us on WhatsApp" : "تواصل معنا عبر واتساب";

    return (
        <a
            href={`https://wa.me/${number}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1 hover:scale-105 rtl:left-6 rtl:right-auto"
        >
            <FaWhatsapp size={30} aria-hidden="true" />
        </a>
    );
}
