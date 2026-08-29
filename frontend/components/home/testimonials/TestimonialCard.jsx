"use client";

import Image from "next/image";
import { HiStar } from "react-icons/hi";
import { useLanguage } from "@/providers/LanguageProvider";

const TestimonialCard = ({ testimonial }) => {
    const { language, localize } = useLanguage();

    const defaultName = language === "en" ? "Academy Student" : "طالب بالأكاديمية";
    const name = localize(testimonial?.name, defaultName);
    const review = localize(testimonial?.review, "");
    const position = localize(testimonial?.position, "");

    const avatar = (testimonial?.avatar && typeof testimonial.avatar === 'string' && testimonial.avatar.trim() !== '')
        ? testimonial.avatar
        : "/assets/user-icon.png";

    return (
        <article
            className="
                rounded-card
                glass
                p-8
                flex
                flex-col
                gap-3
            "
        >
            {/* Review */}
            <blockquote
                className="
                    px-5
                    text-base
                    leading-8
                    text-text-secondary
                "
            >
                "{review}"
            </blockquote>

            {/* Rating */}
            <div className="flex items-center gap-1">

                {Array.from({ length: testimonial.rating || 5 }).map((_, index) => (
                    <HiStar
                        key={index}
                        className="
                            h-5
                            w-5
                            text-yellow-400
                        "
                    />
                ))}

            </div>

            {/* User */}
            <div className="flex items-center gap-4">

                <div
                    className="
                        relative
                        h-14
                        w-14
                        overflow-hidden
                        rounded-full
                    "
                >
                    <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <div>

                    <h3
                        className="
                            font-semibold
                            text-text-primary
                        "
                    >
                        {name}
                    </h3>

                    {position && (
                        <p
                            className="
                                mt-1
                                text-sm
                                text-text-secondary
                            "
                        >
                            {position}
                        </p>
                    )}

                </div>

            </div>

        </article>
    );
};

export default TestimonialCard;