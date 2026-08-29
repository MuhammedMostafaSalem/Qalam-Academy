"use client";

import CurriculumAccordion from "./CurriculumAccordion";
import ProgressCard from "./ProgressCard";
import { useLanguage } from "@/providers/LanguageProvider";

const LessonSidebar = ({ lesson, courseSlug, courseProgress, courseLessons }) => {
    const { language, localize } = useLanguage();
    const defaultCourseTitle = language === "en" ? "Course" : "الكورس";
    const courseTitle = localize(lesson?.course?.title, defaultCourseTitle);

    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <div className="border-b border-border p-6">
                <h2 className="text-xl font-bold">
                    {courseTitle}
                </h2>

                <p className="mt-2 text-sm text-text-secondary">
                    {language === "en"
                        ? "Track your progress and complete lessons sequentially."
                        : "تابع تقدمك وأكمل الدروس بالترتيب."}
                </p>
            </div>

            {/* Progress */}
            <div className="border-b border-border p-6">
                <ProgressCard courseProgress={courseProgress} />
            </div>

            {/* Curriculum */}
            <div className="flex-1 overflow-y-auto">
                <CurriculumAccordion 
                    courseProgress={courseProgress}
                    courseLessons={courseLessons}
                    currentLessonId={lesson?._id}
                    courseSlug={courseSlug}
                />
            </div>
        </div>
    );
};

export default LessonSidebar;