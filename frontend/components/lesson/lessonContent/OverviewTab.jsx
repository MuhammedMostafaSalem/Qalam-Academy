import lessonData from "../lessonData";

const OverviewTab = () => {
    const currentLesson = lessonData.modules
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.active);

    return (
        <div className="space-y-8">
            {/* Description */}
            <section>
                <h2 className="mb-4 text-xl font-bold">
                    عن هذا الدرس
                </h2>

                <p className="leading-8 text-text-secondary">
                    في هذا الدرس ستتعلم أساسيات {currentLesson.title} بطريقة
                    عملية من خلال أمثلة حقيقية تساعدك على فهم الفكرة وتطبيقها
                    داخل مشاريع React.
                </p>
            </section>

            {/* What You'll Learn */}

            <section>
                <h2 className="mb-5 text-xl font-bold">
                    ماذا ستتعلم؟
                </h2>

                <ul className="space-y-4">
                    {[
                        "فهم الفكرة الأساسية للدرس",
                        "تنفيذ أمثلة عملية",
                        "أفضل الممارسات",
                        "تجنب الأخطاء الشائعة",
                        "استخدامها داخل المشاريع"
                    ].map((item) => (
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