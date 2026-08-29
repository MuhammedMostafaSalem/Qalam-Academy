"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const ProgressCard = ({ courseProgress }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const completedLessons = courseProgress?.completedLessons || 0;
    const totalLessons = courseProgress?.totalLessons || 0;
    const progressPercent = courseProgress?.progressPercent || 0;

    return (
        <div
            className="
                rounded-2xl
                border
                border-border
                bg-background
                p-5
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >
                <h3 className="font-semibold">
                    {isEn ? "Your Progress" : "تقدمك"}
                </h3>

                <span className="text-primary font-bold">
                    {Math.round(progressPercent)}%
                </span>
            </div>

            <div
                className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-background-alt
                "
            >
                <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{
                        width: `${progressPercent}%`,
                    }}
                />
            </div>

            <div
                className="
                    mt-4
                    flex
                    justify-between
                    text-sm
                    text-text-secondary
                "
            >
                <span>
                    {completedLessons} / {totalLessons}
                </span>

                <span>
                    {isEn ? "Lessons completed" : "درس مكتمل"}
                </span>
            </div>
        </div>
    );
};

export default ProgressCard;