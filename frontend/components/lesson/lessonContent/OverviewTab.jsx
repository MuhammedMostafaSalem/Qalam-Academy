"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const OverviewTab = ({ lesson }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const title = lesson?.title ? localize(lesson.title) : (isEn ? "this lesson" : "هذا الدرس");
    const defaultDesc = isEn
        ? `In this lesson, you will learn the core concepts and practical implementations of ${title}.`
        : `في هذا الدرس ستتعلم المفاهيم والتطبيقات العملية الخاصة بـ ${title}.`;
    const description = lesson?.description ? localize(lesson.description) : defaultDesc;

    const defaultPoints = isEn
        ? [
            "Understanding fundamental principles and practical implementation",
            "Building interactive hands-on examples and exercises",
            "Software engineering best practices and design patterns",
            "Avoiding common pitfalls and architectural bugs",
        ]
        : [
            "فهم الفكرة الأساسية والتطبيق العملي",
            "تنفيذ أمثلة وتمارين تفاعلية",
            "أفضل الممارسات البرمجية",
            "تجنب الأخطاء الشائعة",
        ];

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
            <section>
                <h2 className="mb-5 text-xl font-bold">
                    {isEn ? "What You'll Learn" : "ماذا ستتعلم؟"}
                </h2>

                <ul className="space-y-4">
                    {defaultPoints.map((item) => (
                        <li
                            key={item}
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
        </div>
    );
};

export default OverviewTab;
