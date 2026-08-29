"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { getHeroByPageAction } from "@/actions/heroActions";

import { useLanguage } from "@/providers/LanguageProvider";

const CoursesHeroContent = () => {
    const { language, localize } = useLanguage();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroByPageAction("courses");
                if (res.success && res.data) {
                    setHero(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch courses hero", err);
            }
        };
        fetchHero();
    }, []);

    const title = localize(hero?.title);
    const subtitle = localize(hero?.subtitle, language === "en" ? "Our Courses" : "كورساتنا");
    const description = localize(hero?.description);

    const defaultTitlePart1 = language === "en" ? "Professional Tech Courses" : "كورسات تقنية احترافية";
    const defaultTitlePart2 = language === "en" ? "Led by Industry Experts" : "بقيادة خبراء المجال";
    const defaultDescription = language === "en"
        ? "Learn in-demand skills for the modern job market with practically designed courses from fundamentals to mastery."
        : "تعلم المهارات المطلوبة لسوق العمل من خلال دورات عملية مصممة باحترافية، تبدأ من الأساسيات وحتى الاحتراف الكامل بمشاريع حقيقية.";

    return (
        <div className="flex flex-col">
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            {/* Heading */}
            <h1
                {...heroAnimation.title}
                className="mt-6 max-w-2xl font-bold text-4xl md:text-5xl lg:text-[60px] text-text-primary leading-tight"
            >
                {title ? (
                    <span>{title}</span>
                ) : (
                    <>
                        <span className="block text-4xl md:text-5xl lg:text-[60px] text-text-primary">
                            {defaultTitlePart1}
                        </span>
                        <span className="block mt-2 text-4xl md:text-5xl lg:text-[60px]">
                            <span className="bg-gradient-to-r from-[#3ABEFF] via-[#4F8BFF] to-[#7A5CFF] bg-clip-text text-transparent">
                                {defaultTitlePart2}
                            </span>
                        </span>
                    </>
                )}
            </h1>

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

            <HeroButtons />
            <HeroFeatures />
        </div>
    );
};

export default CoursesHeroContent;
