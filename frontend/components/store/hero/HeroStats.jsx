"use client";

import { MdOutlineHighQuality } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroStats = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const stats = [
        {
            id: 1,
            icon: MdOutlineHighQuality,
            value: isEn ? "High Quality" : "جودة عالية",
            label: isEn ? "Organized & Tested Content" : "محتوى منظم ومجرب",
        },
        {
            id: 2,
            icon: FiDownload,
            value: isEn ? "Instant Download" : "تحميل فوري",
            label: isEn ? "Ready-to-use Files" : "ملفات جاهزة للتحميل",
        },
        {
            id: 3,
            icon: GoShieldCheck,
            value: isEn ? "Payment Security" : "أمان في الدفع",
            label: isEn ? "100% Secure Checkout" : "دفع آمن 100%",
        },
    ];

    return (
        <div className="mt-16 flex justify-center gap-5">
            {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col items-center text-center gap-2 pe-5"
                    >
                        <Icon
                            size={18}
                            className="
                                text-accent
                            "
                        />

                        <h3 className="
                            text-[10px]
                            sm:text-[12px]
                            md:text-[14px]
                            leading-none
                            text-text-primary
                        ">
                            {item.value}
                        </h3>

                        <p className="
                            text-[8px]
                            sm:text-[10px]
                            md:text-[12px]
                            text-text-secondary
                        ">
                            {item.label}
                        </p>

                        {index !== stats.length - 1 && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    h-[40px]
                                    w-[1px]
                                    bg-card-hover
                                "
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default HeroStats;
