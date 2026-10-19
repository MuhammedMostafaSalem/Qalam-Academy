
"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const OverviewTab = ({ lesson }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    // ----------------------------------------
    // Lesson title
    // ----------------------------------------

    const title = lesson?.title
        ? localize(lesson.title)
        : isEn
            ? "this lesson"
            : "هذا الدرس";

    // ----------------------------------------
    // Lesson description
    // ----------------------------------------

    const defaultDesc = isEn
        ? `In this lesson, you will learn the core concepts and practical implementations of ${title}.`
        : `في هذا الدرس ستتعلم المفاهيم والتطبيقات العملية الخاصة بـ ${title}.`;

    const description = lesson?.description
        ? localize(lesson.description)
        : defaultDesc;

    // ----------------------------------------
    // Learning Points from Backend
    // ----------------------------------------

    const learningPoints = Array.isArray(lesson?.learningPoints)
        ? lesson.learningPoints
            .map((point) => {
                if (typeof point === "string") {
                    return point.trim();
                }

                if (point && typeof point === "object") {
                    const localizedPoint = localize(point);

                    return typeof localizedPoint === "string"
                        ? localizedPoint.trim()
                        : "";
                }

                return "";
            })
            .filter((point) => point.length > 0)
        : [];

    return (
        <div className="space-y-8">
            {/* Description */}
            <section>
                <h2 className="mb-4 text-xl font-bold">
                    {isEn ? "About this Lesson" : "عن هذا الدرس"}
                </h2>

                <p className="leading-8 text-text-secondary">
                    {description}
                </p>
            </section>

            {/* What You'll Learn */}
            {learningPoints.length > 0 && (
                <section>
                    <h2 className="mb-5 text-xl font-bold">
                        {isEn
                            ? "What You'll Learn"
                            : "ماذا ستتعلم؟"}
                    </h2>

                    <ul className="space-y-4">
                        {learningPoints.map((item, index) => (
                            <li
                                key={`${index}-${item}`}
                                className="flex items-start gap-3"
                            >
                                <span className="mt-1 text-primary">
                                    ✓
                                </span>

                                <span className="text-text-secondary">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default OverviewTab;
