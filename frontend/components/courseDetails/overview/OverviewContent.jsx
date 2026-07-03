import LearningPoints from "./LearningPoints";
import Requirements from "./Requirements";

const OverviewContent = () => {
    return (
        <div className="flex flex-col">
            {/* Description */}
            <section>
                <h2 className="text-2xl font-bold">
                    نبذة عن الكورس
                </h2>

                <div
                    className="
                        mt-6
                        space-y-6
                        text-lg
                        leading-8
                        text-text-secondary
                    "
                >
                    <p>
                        صُمم هذا الكورس ليأخذك خطوة بخطوة من أساسيات تطوير
                        الواجهات الأمامية وحتى بناء تطبيقات احترافية باستخدام
                        أحدث التقنيات المطلوبة في سوق العمل.
                    </p>

                    <p>
                        ستتعلم كيفية بناء صفحات متجاوبة، وإدارة البيانات،
                        والتعامل مع واجهات البرمجة (APIs)، بالإضافة إلى تنفيذ
                        مشاريع عملية تحاكي بيئة العمل الحقيقية حتى تكتسب
                        الخبرة اللازمة للانطلاق في مسيرتك المهنية.
                    </p>

                    <p>
                        يعتمد الكورس على التطبيق العملي بنسبة كبيرة، لذلك
                        ستقوم ببناء عدة مشاريع متكاملة تساعدك على إنشاء معرض
                        أعمال (Portfolio) قوي يمكنك عرضه أثناء التقديم على
                        الوظائف.
                    </p>
                </div>
            </section>

            {/* Learning Points */}

            <LearningPoints />

            {/* Requirements */}

            <Requirements />
        </div>
    );
};

export default OverviewContent;