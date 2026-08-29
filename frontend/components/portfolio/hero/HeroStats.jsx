"use client";

import { cardAnimation } from "@/lib/animation/cardAnimation";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroStats = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const stats = [
        {
            value: "350+",
            label: isEn ? "Completed Projects" : "مشروع مكتمل",
        },
        {
            value: "250+",
            label: isEn ? "Happy Clients" : "عميل سعيد",
        },
        {
            value: "7+",
            label: isEn ? "Years of Experience" : "سنوات خبرة",
        },
        {
            value: "98%",
            label: isEn ? "Client Satisfaction" : "رضا العملاء",
        },
    ];

    return (
        <div
            className="
                mt-16
                grid
                w-full
                max-w-4xl
                grid-cols-2
                gap-6
                md:grid-cols-4
            "
        >
            {stats.map((item, index) => (
                <div
                    key={index}
                    {...cardAnimation(index)}
                    className={`
                        rounded-3xl
                        border
                        border-border
                        bg-card/60
                        p-6
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:border-primary
                        ${animations.hoverLift}
                    `}
                >
                    <h3
                        className="
                            text-4xl
                            font-bold
                            text-primary
                        "
                    >
                        {item.value}
                    </h3>

                    <p
                        className="
                            mt-3
                            text-sm
                            text-text-secondary
                        "
                    >
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default HeroStats;