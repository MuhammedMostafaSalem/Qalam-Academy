"use client";

import Link from "next/link";
import { HiOutlineClock, HiOutlineBookOpen, HiOutlineUser } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const LessonHeader = ({ lesson }) => {
    const { language, localize } = useLanguage();
    const defaultLessonTitle = language === "en" ? "Current Lesson" : "الدرس الحالي";
    const defaultCourseTitle = language === "en" ? "Course" : "الكورس";
    const title = localize(lesson?.title, defaultLessonTitle);
    const courseTitle = localize(lesson?.course?.title, defaultCourseTitle);
    const courseSlug = lesson?.course?.slug;
    const description = localize(lesson?.description, "");
    const minText = language === "en" ? "min" : "دقيقة";
    const duration = lesson?.duration ? `${lesson.duration} ${minText}` : "—";
    const instructorName = lesson?.course?.instructor
        ? `${lesson.course.instructor.firstName || ""} ${lesson.course.instructor.lastName || ""}`.trim()
        : null;
    const rawLevel = lesson?.course?.level;
    const level = rawLevel === "beginner"
        ? (language === "en" ? "Beginner" : "مبتدئ")
        : rawLevel === "intermediate"
            ? (language === "en" ? "Intermediate" : "متوسط")
            : rawLevel === "advanced"
                ? (language === "en" ? "Advanced" : "متقدم")
                : rawLevel || "";

    return (
        <header className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                {courseSlug ? (
                    <Link href={`/courses/${courseSlug}`} className="hover:text-primary transition-colors">
                        {courseTitle}
                    </Link>
                ) : (
                    <span>{courseTitle}</span>
                )}

                <span>/</span>

                <span className="text-text-primary font-medium">{title}</span>
            </div>

            {/* Lesson Title */}
            <h1
                className="
                    text-3xl
                    font-bold
                    text-text-primary
                "
            >
                {title}
            </h1>

            {/* Description */}
            {description && (
                <p
                    className="
                        max-w-3xl
                        leading-8
                        text-text-secondary
                    "
                >
                    {description}
                </p>
            )}

            {/* Meta */}
            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-6
                    text-sm
                    text-text-secondary
                "
            >
                <div className="flex items-center gap-2">
                    <HiOutlineClock className="text-primary" size={18} />
                    <span>{duration}</span>
                </div>

                {instructorName && (
                    <div className="flex items-center gap-2">
                        <HiOutlineUser className="text-primary" size={18} />
                        <span>{instructorName}</span>
                    </div>
                )}

                {level && (
                    <div className="flex items-center gap-2">
                        <HiOutlineBookOpen className="text-primary" size={18} />
                        <span>{level}</span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default LessonHeader;