"use client";

import { cardAnimation } from "@/lib/animation/cardAnimation";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { useLanguage } from "@/providers/LanguageProvider";

const ServiceCard = ({ service, botton, index }) => {
    const Icon = service.icon;
    const { language, localize } = useLanguage();

    const title = localize(service.title);
    const description = localize(service.description);
    const learnMoreText = language === "en" ? "Learn More" : "أعرف المزيد";

    return (
        <article
            {...cardAnimation(index)}
            className="
                relative
                glass
                overflow-hidden
                rounded-card
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary/40
                hover:shadow-2xl
                hover:shadow-primary/10
            "
        >
            {/* Icon */}
            <div
                className={`
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    text-primary
                `}
            >
                <Icon size={30} />
            </div>

            {/* Content */}

            <div className="relative flex flex-col gap-2">

                <h3
                    className="
                        text-lg
                        font-bold
                        text-text-primary
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        text-sm leading-5
                        text-text-secondary
                    "
                >
                    {description}
                </p>

            </div>

            {/* Footer */}
            {
                botton && 
                <div className="relative mt-8">

                    <Link
                        href={`/services/${service.slug}`}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-primary
                            transition-all
                            duration-300
                            group-hover:gap-4
                        "
                    >
                        {learnMoreText}

                        <HiArrowRight
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                </div>
            }

        </article>
    );
};

export default ServiceCard;
