"use client";

import {
    HiOutlineFaceSmile,
    HiOutlineCodeBracket,
    HiOutlineUsers,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import CompanyStatCard from "./CompanyStatCard";
import { useLanguage } from "@/providers/LanguageProvider";

const CompanyStats = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const stats = [
        {
            id: 1,
            icon: HiOutlineFaceSmile,
            value: "250+",
            label: isEn ? "Successful Students" : "طالب ناجح",
        },
        {
            id: 2,
            icon: HiOutlineCodeBracket,
            value: "350+",
            label: isEn ? "Completed Projects" : "مشروع مكتمل",
        },
        {
            id: 3,
            icon: HiOutlineUsers,
            value: "30+",
            label: isEn ? "Expert Instructors" : "مدرب محترف",
        },
        {
            id: 4,
            icon: HiOutlineAcademicCap,
            value: "7+",
            label: isEn ? "Years of Experience" : "سنوات خبرة",
        },
    ];

    return (
        <section className="mt-20">

            <div
                className="
                    grid
                    grid-cols-2
                    lg:grid-cols-4
                    overflow-hidden
                    rounded-3xl
                    glass
                "
            >
                {stats.map((stat, index) => (
                    <CompanyStatCard
                        index={index}
                        key={stat.id}
                        {...stat}
                        isLast={index === stats.length - 1}
                    />
                ))}
            </div>

        </section>
    );
};

export default CompanyStats;