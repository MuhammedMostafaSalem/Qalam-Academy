"use client";

import { useEffect, useState } from "react";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { getHeroByPageAction } from "@/actions/heroActions";

import { useLanguage } from "@/providers/LanguageProvider";

const HeroContent = () => {
    const { language, localize } = useLanguage();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("home");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch home hero", err);
            }
        };
        fetchHero();
    }, [language]);

    const title = localize(hero?.title);
    const description = localize(hero?.description);

    const defaultTitle = language === "en" ? "Towards a Digital Future" : "نحو مستقبل رقمي";
    const defaultSubtitle = language === "en" ? "We build innovative software solutions" : "نصنع الحلول البرمجية";
    const defaultDescription = language === "en"
        ? "We are a full-service software academy helping businesses and individuals turn ideas into innovative digital products."
        : "نحن أكاديمية وشركة برمجيات متكاملة نساعد الشركات والأفراد على تحويل أفكارهم إلى منتجات رقمية مبتكرة وفعّالة.";

    return (
        <div className="flex flex-col justify-center">
            {/* Heading */}
            <h1
                {...heroAnimation.title}
                className="mt-6 max-w-2xl text-4xl md:text-5xl lg:text-[60px] text-text-primary leading-tight font-bold"
            >
                {title ? (
                    <span>{title}</span>
                ) : (
                    <>
                        <span className="block text-4xl md:text-5xl lg:text-[60px] text-text-primary">
                            {defaultTitle}
                        </span>

                        <span className="block mt-2 text-4xl md:text-5xl lg:text-[60px]">
                            <span className="bg-gradient-to-r from-[#3ABEFF] via-[#4F8BFF] to-[#7A5CFF] bg-clip-text text-transparent">
                                {defaultSubtitle}
                            </span>
                        </span>
                    </>
                )}
            </h1>

            {/* Description */}
            <p
                {...heroAnimation.description}
                className="
                    mt-6
                    max-w-xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                {description || defaultDescription}
            </p>

            <div {...heroAnimation.buttons}>
                <HeroButtons />
            </div>

            <div {...heroAnimation.buttons}>
                <HeroStats />
            </div>
        </div>
    );
};

export default HeroContent;
