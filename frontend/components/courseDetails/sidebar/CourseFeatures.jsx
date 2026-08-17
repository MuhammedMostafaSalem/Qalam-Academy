import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlineLanguage,
    HiOutlineDocumentDuplicate,
} from "react-icons/hi2";

const CourseFeatures = ({ course }) => {
    const duration = course?.duration
        ? (typeof course.duration === "number" ? `${course.duration} دقيقة` : course.duration)
        : "—";

    const features = [
        {
            icon: HiOutlineClock,
            label: "المدة",
            value: duration,
        },
        {
            icon: HiOutlineAcademicCap,
            label: "المستوى",
            value: course?.level === "beginner" 
                ? "مبتدئ" 
                : course?.level === "intermediate" 
                    ? "متوسط" 
                    : course?.level === "advanced" 
                        ? "متقدم" 
                        : course?.level || "—",
        },
        {
            icon: HiOutlineDocumentDuplicate,
            label: "عدد الدروس",
            value: (course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length) !== undefined
                ? `${course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length} درس`
                : "—",
        },
        {
            icon: HiOutlineLanguage,
            label: "اللغة",
            value: course?.language === "arabic" || course?.language === "ar"
                ? "العربية" 
                : course?.language === "english" || course?.language === "en"
                    ? "English" 
                    : course?.language || "—",
        },
    ];

    return (
        <div className="space-y-5">
            {features.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.label}
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
                            <span>{item.label}</span>
                        </div>

                        <span className="text-text-secondary">
                            {item.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default CourseFeatures;