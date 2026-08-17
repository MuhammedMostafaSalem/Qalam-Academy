import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlinePlayCircle,
} from "react-icons/hi2";

const CourseIncludes = ({ course }) => {
    const duration = course?.duration
        ? `${course.duration} دقيقة`
        : "40 ساعة";

    const lessonsCount = (course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length) !== undefined
        ? `${course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length ?? 0} درس`
        : "—";

    const levelText = course?.level === "beginner"
        ? "مبتدئ"
        : course?.level === "intermediate"
            ? "متوسط"
            : course?.level === "advanced"
                ? "متقدم"
                : course?.level || "مبتدئ → متقدم";

    const includes = [
        {
            icon: HiOutlineClock,
            title: "مدة الكورس",
            value: duration,
        },
        {
            icon: HiOutlinePlayCircle,
            title: "الفيديوهات",
            value: lessonsCount,
        },
        {
            icon: HiOutlineAcademicCap,
            title: "المستوى",
            value: levelText,
        },
    ];

    return (
        <div
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-7
            "
        >
            <h3 className="text-xl font-bold">
                يتضمن الكورس
            </h3>

            <div className="mt-7 space-y-5">
                {includes.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <Icon
                                    size={22}
                                    className="text-primary"
                                />

                                <span>
                                    {item.title}
                                </span>
                            </div>

                            <span className="text-text-secondary">
                                {item.value}
                            </span>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseIncludes;