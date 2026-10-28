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
    // const duration = course?.duration 
    //     ? (typeof course.duration === "number"
    //         ? `${course.duration} ${isEn ? "hours" : "ساعة"}`
    //         : course.duration)
    //     : "—";

    const durationMinutes = Number(course?.duration ?? 0);

    const duration = (() => {
        if (!Number.isFinite(durationMinutes) || durationMinutes < 0) {
            return "—";
        }

        const totalMinutes = Math.floor(durationMinutes);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours === 0 && minutes === 0) {
            return isEn ? "0 minutes" : "0 دقيقة";
        }

        if (isEn) {
            const parts = [];

            if (hours > 0) {
                parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
            }

            if (minutes > 0) {
                parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
            }

            return parts.join(" ");
        }

        const parts = [];

        if (hours > 0) {
            parts.push(`${hours} ${hours === 1 ? "ساعة" : "ساعات"}`);
        }

        if (minutes > 0) {
            parts.push(`${minutes} دقيقة`);
        }

        return parts.join(" و ");
    })();


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
        // {
        //     id: "duration",
        //     icon: HiOutlineClock,
        //     title: duration,
        //     subtitle: isEn ? "Course Duration" : "مدة الكورس",
        // },
        // {
        //     id: "lessons",
        //     icon: HiOutlineAcademicCap,
        //     title: `${totalLessons}`,
        //     subtitle: isEn ? "Lessons" : "درس",
        // },
    ];

    return (
        <div
            {...fadeUp()}
            className="
                mt-10
                flex
                gap-6
                flex-col
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