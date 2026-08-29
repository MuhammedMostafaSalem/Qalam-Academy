"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import { getHeroByPageAction } from "@/actions/heroActions";

import { useLanguage } from "@/providers/LanguageProvider";

const HeroContent = () => {
    const { language, localize } = useLanguage();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("store");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch store hero", err);
            }
        };
        fetchHero();
    }, [language]);

    const title = localize(hero?.title);
    const subtitle = localize(hero?.subtitle, language === "en" ? "Digital Store" : "المتجر الرقمي");
    const defaultDesc = language === "en"
        ? "Professional digital products and tools to help you design, build, and scale your projects effectively."
        : "منتجات وأدوات احترافية تساعدك على بناء وتطوير وتصميم مشاريعك بكفاءة عالية";
    const description = localize(hero?.description, defaultDesc);

    const defaultTitlePart1 = language === "en" ? "Everything you need to " : "كل ما تحتاجه ";
    const defaultTitlePart2 = language === "en" ? "grow your work" : "لتطوير عملك";

    return (
        <div
            className="
                mx-auto
                flex
                max-w-4xl
                flex-col
                items-center
                text-center
                gap-5
            "
        >
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            <SectionTitle>
                {title ? (
                    title
                ) : (
                    <>
                        {defaultTitlePart1}<span className="gradient-text">{defaultTitlePart2}</span>
                    </>
                )}
            </SectionTitle>

            <SectionDescription>
                {description}
            </SectionDescription>
        </div>
    );
};

export default HeroContent;