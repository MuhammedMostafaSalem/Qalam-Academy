"use client";

import { heroAnimation } from "@/lib/animation/heroAnimation";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";

const PortfolioHeroContent = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                mx-auto
                flex
                max-w-5xl
                flex-col
                items-center
                text-center
            "
        >
            <span
                {...heroAnimation.badge}
                className={`
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/10
                    px-5
                    py-2
                    text-sm
                    text-primary
                    ${animations.transition}
                `}
            >
                {isEn ? "Our Portfolio" : "أعمالنا"}
            </span>

            <h1
                {...heroAnimation.title}
                className="mt-6 max-w-2xl"
            >
                <span className="block text-4xl md:text-5xl lg:text-[60px] text-text-primary">
                    {isEn ? "Projects We Are Proud" : "مشاريع نفتخر"}
                </span>

                <span className="block mt-2 text-4xl md:text-5xl lg:text-[60px]">
                    <span className="gradient-text">
                        {isEn ? "To Build With Our Clients" : "ببنائها مع عملائنا"}
                    </span>
                </span>
            </h1>

            <p
                {...heroAnimation.description}
                className={`
                    mt-8
                    max-w-3xl
                    text-lg
                    leading-9
                    text-text-secondary
                    ${animations.transition}
                `}
            >
                {isEn
                    ? "Explore a curated selection of solutions and applications built across various domains, ranging from learning platforms and enterprise management to cross-platform mobile apps."
                    : "استكشف مجموعة من المشاريع التي قمنا بتطويرها في مجالات مختلفة، بدايةً من منصات التعليم وإدارة الأعمال وحتى تطبيقات الهواتف والأنظمة المخصصة."}
            </p>

            <HeroButtons />

            <HeroStats />
        </div>
    );
};

export default PortfolioHeroContent;
