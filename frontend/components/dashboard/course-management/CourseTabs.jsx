"use client";

import {
    HiOutlineVideoCamera,
    HiOutlineInformationCircle,
    HiOutlineUsers,
    HiOutlineStar,
} from "react-icons/hi2";

const tabs = [
    {
        key: "lessons",
        title: "الدروس",
        icon: HiOutlineVideoCamera,
    },
    {
        key: "info",
        title: "معلومات الكورس",
        icon: HiOutlineInformationCircle,
    },
    {
        key: "students",
        title: "الطلاب",
        icon: HiOutlineUsers,
    },
    {
        key: "reviews",
        title: "التقييمات",
        icon: HiOutlineStar,
    },
];

const CourseTabs = ({ activeTab, setActiveTab }) => {
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