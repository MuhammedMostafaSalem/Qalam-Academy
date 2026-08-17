const OverviewTab = ({ lesson }) => {
    const title = lesson?.title || "هذا الدرس";
    const description = lesson?.description || `في هذا الدرس ستتعلم المفاهيم والتطبيقات العملية الخاصة بـ ${title}.`;

    return (
        <div className="space-y-8">
            {/* Description */}
            <section>
                <h2 className="mb-4 text-xl font-bold">
                    عن هذا الدرس
                </h2>

                <p className="leading-8 text-text-secondary">
                    {description}
                </p>
            </section>

            {/* What You'll Learn */}
            <section>
                <h2 className="mb-5 text-xl font-bold">
                    ماذا ستتعلم؟
                </h2>

                <ul className="space-y-4">
                    {[
                        "فهم الفكرة الأساسية والتطبيق العملي",
                        "تنفيذ أمثلة وتمارين تفاعلية",
                        "أفضل الممارسات البرمجية",
                        "تجنب الأخطاء الشائعة",
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