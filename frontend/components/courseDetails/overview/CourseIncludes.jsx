import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlinePlayCircle,
    HiOutlineDocumentText,
    HiOutlineDevicePhoneMobile,
    HiOutlineTrophy,
} from "react-icons/hi2";

const includes = [
    {
        icon: HiOutlineClock,
        title: "مدة الكورس",
        value: "40 ساعة",
    },
    {
        icon: HiOutlinePlayCircle,
        title: "الفيديوهات",
        value: "48 درس",
    },
    {
        icon: HiOutlineAcademicCap,
        title: "المستوى",
        value: "مبتدئ → متقدم",
    },
    {
        icon: HiOutlineDocumentText,
        title: "المشاريع",
        value: "8 مشاريع",
    },
    {
        icon: HiOutlineDevicePhoneMobile,
        title: "الوصول",
        value: "مدى الحياة",
    },
    {
        icon: HiOutlineTrophy,
        title: "الشهادة",
        value: "معتمدة",
    },
];

const CourseIncludes = () => {
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