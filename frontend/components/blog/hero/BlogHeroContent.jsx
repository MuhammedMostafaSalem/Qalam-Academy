"use client";

import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePublicHero } from "@/hooks/heroes/usePublicHero";

const BlogHeroContent = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const hero = usePublicHero("blog");

    const subtitle = localize(hero?.subtitle, isEn ? "Blog & Insights" : "المدونة");
    const title = localize(hero?.title);
    const description = localize(
        hero?.description,
        isEn
            ? "Discover articles on full-stack web development, UI/UX design, artificial intelligence, software engineering, and industry best practices to accelerate your career."
            : "اكتشف أحدث المقالات في تطوير الويب، تصميم واجهات المستخدم، الذكاء الاصطناعي، هندسة البرمجيات، وتجارب عملية تساعدك على تطوير مهاراتك وبناء مشاريع احترافية."
    );

    return (
        <div
            className="
                mx-auto
                flex
                max-w-4xl
                flex-col
                items-center
                text-center
            "
        >
            <SectionBadge>
                {subtitle}
            </SectionBadge>

            <SectionTitle>
                {title || (
                    <>
                        <span>{isEn ? "Articles that help you " : "مقالات تساعدك على "}</span>{" "}
                        <span className="gradient-text">
                            {isEn ? "build better digital products" : "بناء منتجات رقمية أفضل"}
                        </span>
                    </>
                )}
            </SectionTitle>

            <SectionDescription>
                {description}
            </SectionDescription>

            <HeroButtons
                primaryText={localize(hero?.buttonText)}
                primaryLink={hero?.buttonLink}
                secondaryText={localize(hero?.secondaryButtonText)}
                secondaryLink={hero?.secondaryButtonLink}
            />

            <HeroStats />
        </div>
    );
};

export default BlogHeroContent;
