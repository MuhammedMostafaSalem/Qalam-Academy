"use client";

import {
    HiOutlineStar,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import MetaItem from "./MetaItem";
import { fadeUp } from "@/lib/animationHelpers";
import { useLanguage } from "@/providers/LanguageProvider";

const HeroMeta = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const totalStudents = course?.totalStudents ?? course?.studentsCount ?? 0;
    const totalLessons = course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length ?? 0;
    const rating = course?.averageRating !== undefined && course?.averageRating !== null 
        ? Number(course.averageRating).toFixed(1) 
        : "0.0";
    const duration = course?.duration 
        ? (typeof course.duration === "number"
            ? `${course.duration} ${isEn ? "hours" : "ساعة"}`
            : course.duration)
        : "—";

    const metas = [
        {
            id: "rating",
            icon: HiOutlineStar,
            title: rating,
            subtitle: isEn ? "Rating" : "التقييم",
        },
        {
            id: "students",
            icon: HiOutlineUserGroup,
            title: `${totalStudents}`,
            subtitle: isEn ? "Students" : "طالب",
        },
        {
            id: "duration",
            icon: HiOutlineClock,
            title: duration,
            subtitle: isEn ? "Course Duration" : "مدة الكورس",
        },
        {
            id: "lessons",
            icon: HiOutlineAcademicCap,
            title: `${totalLessons}`,
            subtitle: isEn ? "Lessons" : "درس",
        },
    ];

    return (
        <div
            {...fadeUp()}
            className="
                mt-10
                grid
                gap-6
                sm:grid-cols-2
            "
        >
            {metas.map((item, index) => (
                <MetaItem
                    key={item.id}
                    index={index}
                    item={item}
                />
            ))}
        </div>
    );
};

export default HeroMeta;