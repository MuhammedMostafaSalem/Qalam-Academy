"use client";

import SectionBadge from "@/components/sections/SectionBadge";
import HeroMeta from "./HeroMeta";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroContent = ({ course }) => {
    const { language, localize } = useLanguage();
    const title = localize(course?.title, language === "en" ? "Course" : "دورة تعليمية");
    const description = localize(course?.description, "");
    const categoryName = localize(course?.category?.title || course?.category?.name, "");

    return (
        <div className="flex flex-col">
            {categoryName && (
                <SectionBadge>
                    {categoryName}
                </SectionBadge>
            )}

            <h1
                {...heroAnimation.title}
                className="
                    mt-5
                    text-4xl
                    font-bold
                    leading-[1.4]

                    lg:text-5xl
                "
            >
                {title}
            </h1>

            <p
                {...heroAnimation.description}
                className="
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                {description}
            </p>

            <HeroMeta course={course} />
        </div>
    );
};

export default HeroContent;