import {
    HiOutlineCheckCircle,
} from "react-icons/hi2";

const learningPoints = [
    "بناء صفحات احترافية باستخدام HTML5 و CSS3.",
    "إتقان JavaScript الحديثة (ES6+).",
    "إنشاء تطبيقات React احترافية.",
    "استخدام Next.js لبناء تطبيقات سريعة.",
    "إدارة الـ State باستخدام Redux Toolkit.",
    "تنفيذ مشاريع تحاكي بيئة العمل الحقيقية.",
];

const LearningPoints = () => {
    return (
        <section className="mt-14">
            <h2 className="text-2xl font-bold">
                ماذا ستتعلم؟
            </h2>

            <div
                className="
                    mt-8
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >
                {learningPoints.map((item) => (
                    <div
                        key={item}
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
                            "
                            size={22}
                        />

                        <p
                            className="
                                leading-7
                                text-text-secondary
                            "
                        >
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LearningPoints;