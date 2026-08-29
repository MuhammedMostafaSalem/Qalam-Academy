"use client";

import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { useLanguage } from "@/providers/LanguageProvider";

const BlogHeroContent = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

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
                {isEn ? "Blog & Insights" : "المدونة"}
            </SectionBadge>

            <SectionTitle>
                <span>{isEn ? "Articles that help you " : "مقالات تساعدك على "}</span>{" "}
                <span className="gradient-text">
                    {isEn ? "build better digital products" : "بناء منتجات رقمية أفضل"}
                </span>
            </SectionTitle>

            <SectionDescription>
                {isEn
                    ? "Discover articles on full-stack web development, UI/UX design, artificial intelligence, software engineering, and industry best practices to accelerate your career."
                    : "اكتشف أحدث المقالات في تطوير الويب، تصميم واجهات المستخدم، الذكاء الاصطناعي، هندسة البرمجيات، وتجارب عملية تساعدك على تطوير مهاراتك وبناء مشاريع احترافية."}
            </SectionDescription>

            <HeroButtons />

            <HeroStats />
        </div>
    );
};

export default BlogHeroContent;