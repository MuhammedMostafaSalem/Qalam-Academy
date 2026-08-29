"use client";

import {
    HiOutlineFolder,
    HiOutlineUsers,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroStats = () => {
    const { language } = useLanguage();
    const stats = [
        {
            id: 1,
            icon: HiOutlineAcademicCap,
            value: "+25",
            label: language === "en" ? "Instructors" : "محاضرون",
        },
        {
            id: 2,
            icon: HiOutlineClock,
            value: "+7",
            label: language === "en" ? "Years of Experience" : "سنوات خبرة",
        },
        {
            id: 3,
            icon: HiOutlineUsers,
            value: "+80",
            label: language === "en" ? "Happy Clients" : "عملاء سعداء",
        },
        {
            id: 4,
            icon: HiOutlineFolder,
            value: "+150",
            label: language === "en" ? "Completed Projects" : "مشاريع مكتملة",
        },
    ]

    return (
        <div className="mt-16 flex items-center justify-between max-w-2xl">
            {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col items-center text-center flex-1"
                    >
                        <Icon
                            size={18}
                            className="mb-2 text-accent"
                        />

                        <h3 className="text-[26px] leading-none text-text-primary">
                            {item.value}
                        </h3>

                        <p className="mt-2 text-xs text-text-secondary">
                            {item.label}
                        </p>

                        {index !== stats.length - 1 && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    h-full
                                    w-[2px]
                                    bg-card-hover
                                "
                            />
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default HeroStats
