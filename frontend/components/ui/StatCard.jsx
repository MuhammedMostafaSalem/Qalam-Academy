"use client";

import {
    HiArrowTrendingUp,
    HiArrowTrendingDown,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const StatCard = ({
    title,
    value,
    change,
    positive,
    description,
    icon: Icon,
}) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                group

                rounded-3xl
                border
                border-border

                bg-card

                p-6

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/30
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-text-secondary">
                        {localize(title)}
                    </p>

                    <h3
                        className="
                            mt-3
                            text-4xl
                            font-bold
                        "
                    >
                        {value}
                    </h3>

                    <span
                        className="
                            mb-1
                            text-sm
                            text-text-secondary
                        "
                    >
                        {localize(description)}
                    </span>
                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-card

                        text-primary

                        transition-all
                        duration-300

                        group-hover:scale-110
                    "
                >
                    <Icon size={28} />
                </div>
            </div>

            {change && (
                <div className="flex items-center gap-2">
                    <span className="text-text-secondary text-sm">
                        {isEn ? "Compared to last month" : "مقارنة بالشهر الماضي"}
                    </span>

                    <span
                        className={
                            positive
                                ? "text-success font-medium"
                                : "text-error font-medium"
                        }
                    >
                        {change}
                    </span>

                    {positive ? (
                        <HiArrowTrendingUp
                            className="text-success"
                            size={20}
                        />
                    ) : (
                        <HiArrowTrendingDown
                            className="text-error"
                            size={20}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default StatCard;
