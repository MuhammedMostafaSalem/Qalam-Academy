import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlineLanguage,
    HiOutlineDevicePhoneMobile,
    HiOutlineDocumentDuplicate,
    HiOutlineTrophy,
} from "react-icons/hi2";

const CourseFeatures = ({ course }) => {
    const features = [
        {
            icon: HiOutlineClock,
            label: "المدة",
            value: course?.duration || "—",
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
            value: course?.lessonsCount ? `${course.lessonsCount} درس` : "—",
        },
        {
            icon: HiOutlineLanguage,
            label: "اللغة",
            value: course?.language === "ar" 
                ? "العربية" 
                : course?.language === "en" 
                    ? "English" 
                    : course?.language || "—",
        },
        {
            icon: HiOutlineDevicePhoneMobile,
            label: "الوصول",
            value: "مدى الحياة",
        },
        {
            icon: HiOutlineTrophy,
            label: "الشهادة",
            value: "معتمدة",
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