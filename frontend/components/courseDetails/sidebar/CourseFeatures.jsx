"use client";

import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlineLanguage,
    HiOutlineDocumentDuplicate,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const CourseFeatures = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const duration = course?.duration
        ? (typeof course.duration === "number" ? `${course.duration} ${isEn ? "mins" : "دقيقة"}` : course.duration)
        : "—";

    const countVal = course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length;
    const lessonsCount = countVal !== undefined
        ? `${countVal} ${isEn ? "lessons" : "درس"}`
        : "—";

    const features = [
        {
            icon: HiOutlineClock,
            label: isEn ? "Duration" : "المدة",
            value: duration,
        },
        {
            icon: HiOutlineAcademicCap,
            label: isEn ? "Level" : "المستوى",
            value: course?.level === "beginner" 
                ? (isEn ? "Beginner" : "مبتدئ")
                : course?.level === "intermediate" 
                    ? (isEn ? "Intermediate" : "متوسط")
                    : course?.level === "advanced" 
                        ? (isEn ? "Advanced" : "متقدم")
                        : course?.level || (isEn ? "All Levels" : "—"),
        },
        {
            icon: HiOutlineDocumentDuplicate,
            label: isEn ? "Total Lessons" : "عدد الدروس",
            value: lessonsCount,
        },
        {
            icon: HiOutlineLanguage,
            label: isEn ? "Language" : "اللغة",
            value: course?.language === "arabic" || course?.language === "ar"
                ? (isEn ? "Arabic" : "العربية")
                : course?.language === "english" || course?.language === "en"
                    ? (isEn ? "English" : "الإنجليزية")
                    : course?.language || (isEn ? "Arabic" : "العربية"),
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