"use client";

import {
    HiOutlineVideoCamera,
    HiOutlineInformationCircle,
    HiOutlineUsers,
    HiOutlineStar,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const CourseTabs = ({ activeTab, setActiveTab }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const tabs = [
        {
            key: "lessons",
            title: isEn ? "Lessons" : "الدروس",
            icon: HiOutlineVideoCamera,
        },
        {
            key: "info",
            title: isEn ? "Course Info" : "معلومات الكورس",
            icon: HiOutlineInformationCircle,
        },
        {
            key: "students",
            title: isEn ? "Students" : "الطلاب",
            icon: HiOutlineUsers,
        },
        {
            key: "reviews",
            title: isEn ? "Reviews" : "التقييمات",
            icon: HiOutlineStar,
        },
    ];

    return (
        <div
            className="
                glass
                overflow-x-auto
                rounded-3xl
                border
                border-border
                p-2
            "
        >
            <nav
                className="
                    flex
                    min-w-max
                    gap-2
                "
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                flex
                                items-center
                                gap-2
                                rounded-2xl
                                px-5
                                py-3
                                text-sm
                                font-medium
                                transition-all
                                duration-300

                                ${activeTab === tab.key
                                    ? "bg-primary text-white shadow-lg"
                                    : "hover:bg-background-alt"
                                }
                            `}
                        >
                            <Icon size={20} />
                            {tab.title}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default CourseTabs;