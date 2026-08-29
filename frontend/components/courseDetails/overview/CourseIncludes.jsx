"use client";

import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlinePlayCircle,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const CourseIncludes = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const duration = course?.duration
        ? (typeof course.duration === "number"
            ? `${course.duration} ${isEn ? "mins" : "دقيقة"}`
            : course.duration)
        : "—";

    const countVal = course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length;
    const lessonsCount = countVal !== undefined
        ? `${countVal} ${isEn ? "lessons" : "درس"}`
        : "—";

    const levelText = course?.level === "beginner"
        ? (isEn ? "Beginner" : "مبتدئ")
        : course?.level === "intermediate"
            ? (isEn ? "Intermediate" : "متوسط")
            : course?.level === "advanced"
                ? (isEn ? "Advanced" : "متقدم")
                : course?.level || (isEn ? "All Levels" : "مبتدئ → متقدم");

    const includes = [
        {
            icon: HiOutlineClock,
            title: isEn ? "Course Duration" : "مدة الكورس",
            value: duration,
        },
        {
            icon: HiOutlinePlayCircle,
            title: isEn ? "Lessons / Videos" : "الفيديوهات",
            value: lessonsCount,
        },
        {
            icon: HiOutlineAcademicCap,
            title: isEn ? "Skill Level" : "المستوى",
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
                {isEn ? "Course Includes" : "يتضمن الكورس"}
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
