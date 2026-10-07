"use client";

import { cardAnimation } from "@/lib/animation/cardAnimation";
import { getPageSectionIcon } from "@/lib/icons/pageSectionIcons";
import { useLanguage } from "@/providers/LanguageProvider";

const ProcessCard = ({ step, index, isActive }) => {
    const { localize } = useLanguage();
    const Icon = isActive === true ? getPageSectionIcon(step.icon) : step.icon;

    return (
        <article {...cardAnimation(index)} className="relative text-center">
            {/* Timeline Circle */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-white
                    shadow-lg
                "
            >
                <Icon className="h-9 w-9" />
            </div>

            {/* Card */}
            <div
                className="
                    mt-8
                    rounded-3xl
                    glass
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-primary/40
                    hover:shadow-xl
                    hover:shadow-primary/10
                "
            >
                <span
                    className="
                        text-sm
                        font-bold
                        tracking-widest
                        text-primary
                    "
                >
                    {isActive === true ? index+1 :step.number}
                </span>

                <h3
                    className="
                        mt-4
                        text-xl
                        font-bold
                        text-text-primary
                    "
                >
                    {step?.content?.title || localize(step.title)}
                </h3>

                <p
                    className="
                        mt-4
                        leading-7
                        text-text-secondary
                    "
                >
                    {step?.content?.description || localize(step.description)}
                </p>
            </div>
        </article>
    );
};

export default ProcessCard;