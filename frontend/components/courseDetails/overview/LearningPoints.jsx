"use client";

import {
    HiOutlineCheckCircle,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const LearningPoints = ({ objectives }) => {
    const { language, localize } = useLanguage();
    const points = Array.isArray(objectives) ? objectives.filter(Boolean) : [];

    if (points.length === 0) return null;

    return (
        <section>
            <h2 className="text-2xl font-bold">
                {language === "en" ? "What You Will Learn" : "ماذا ستتعلم؟"}
            </h2>

            <div
                className="
                    mt-8
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >
                {points.map((item, index) => (
                    <div
                        key={index}
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-border
                            bg-card
                            p-5
                        "
                    >
                        <HiOutlineCheckCircle
                            className="
                                mt-1
                                text-primary
                                shrink-0
                            "
                            size={22}
                        />

                        <p
                            className="
                                leading-7
                                text-text-secondary
                            "
                        >
                            {localize(item)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LearningPoints;
