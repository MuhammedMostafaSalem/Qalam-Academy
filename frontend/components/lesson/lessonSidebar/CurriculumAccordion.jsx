"use client";

import LessonItem from "./LessonItem";
import { useLanguage } from "@/providers/LanguageProvider";

const CurriculumAccordion = ({ courseProgress, courseLessons = [], currentLessonId, courseSlug }) => {
    const { language } = useLanguage();

    const lessons = (courseLessons && courseLessons.length > 0)
        ? courseLessons
        : (courseProgress?.lessons || []);
    
    if (lessons.length === 0) {
        return (
            <div className="p-6 text-center text-text-secondary">
                {language === "en" ? "No lessons available" : "لا توجد دروس متاحة"}
            </div>
        );
    }

    const title = language === "en" ? "Course Lessons" : "دروس الكورس";

    return (
        <div className="flex flex-col h-full">
            {/* Header ثابت أو عنوان القسم */}
            <div className="px-6 py-4 flex-shrink-0">
                <h3 className="font-semibold">
                    {title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                    {lessons.length} {language === "en" ? "lessons" : "درس"}
                </p>
            </div>

            {/* قائمة الدروس مع Scroll داخلي */}
            <div className="flex-1 overflow-y-auto min-h-[350px]">
                {lessons.map((lesson) => (
                    <LessonItem
                        key={lesson._id || lesson.id}
                        lesson={lesson}
                        currentLessonId={currentLessonId}
                        courseSlug={courseSlug}
                    />
                ))}
            </div>
        </div>
    );
};

export default CurriculumAccordion;