"use client";

import SectionBadge from "@/components/sections/SectionBadge";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { usePublicHero } from "@/hooks/heroes/usePublicHero";

import { useLanguage } from "@/providers/LanguageProvider";

const CoursesHeroContent = () => {
    const { language, localize } = useLanguage();
    const hero = usePublicHero("courses");

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

            <HeroButtons
                primaryText={localize(hero?.buttonText)}
                primaryLink={hero?.buttonLink}
                secondaryText={localize(hero?.secondaryButtonText)}
                secondaryLink={hero?.secondaryButtonLink}
            />
            <HeroFeatures />
        </div>
    );
};

export default CoursesHeroContent;
