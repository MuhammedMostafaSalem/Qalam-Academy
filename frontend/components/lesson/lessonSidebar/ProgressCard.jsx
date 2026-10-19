"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";

const ProgressCard = ({ courseProgress }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const completedLessons = courseProgress?.completedLessons || 0;
    const totalLessons = courseProgress?.totalLessons || 0;
    const progressPercent = Math.min(
        100,
        Math.max(0, courseProgress?.progressPercent ?? courseProgress?.progress ?? 0)
    );

    // التحقق هل الكورس خلص ولا لأ
    const isCompleted = progressPercent === 100 || (totalLessons > 0 && completedLessons >= totalLessons);

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

            {/* زرار التوجيه يظهر فقط عند اكتمال الكورس */}
            {isCompleted && (
                <div className="mt-4 pt-3 border-t border-border">
                    <Link
                        href={`/user/certificates`} // عدّل الرابط حسب صفحتك المطلوبة
                        className="
                            flex 
                            w-full 
                            items-center 
                            justify-center 
                            rounded-xl 
                            bg-primary 
                            py-2.5 
                            text-sm 
                            font-medium 
                            text-primary-foreground 
                            transition-opacity 
                            hover:opacity-90
                        "
                    >
                        {isEn ? "View Certificate / Finish" : "عرض الشهادة / إنهاء الكورس"}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProgressCard;
