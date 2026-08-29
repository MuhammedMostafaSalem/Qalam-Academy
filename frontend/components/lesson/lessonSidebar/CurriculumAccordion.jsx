"use client";

import { useState } from "react";
import {
    HiChevronDown,
    HiChevronUp,
} from "react-icons/hi2";
import LessonItem from "./LessonItem";
import { useLanguage } from "@/providers/LanguageProvider";

const CurriculumAccordion = ({ courseProgress, courseLessons = [], currentLessonId, courseSlug }) => {
    const { language } = useLanguage();
    const [openModule, setOpenModule] = useState(0);

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

    const modules = [
        {
            id: 1,
            title: language === "en" ? "Course Lessons" : "دروس الكورس",
            lessons: lessons,
        }
    ];

    return (
        <div>
            {modules.map((module, index) => {
                const opened = openModule === index;

                return (
                    <div
                        key={module.id}
                        className={`${
                            index !== modules.length - 1
                                ? "border-b border-border"
                                : ""
                        }`}
                    >
                        <button
                            onClick={() =>
                                setOpenModule(
                                    opened ? null : index
                                )
                            }
                            className="
                                flex
                                w-full
                                items-center
                                justify-between
                                px-6
                                py-5
                                text-right
                                hover:bg-background-alt
                                transition
                            "
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {module.title}
                                </h3>

                                <p className="mt-1 text-sm text-text-secondary">
                                    {module.lessons.length} {language === "en" ? "lessons" : "درس"}
                                </p>
                            </div>

                            {opened
                                ? <HiChevronUp />
                                : <HiChevronDown />
                            }
                        </button>

                        {opened && (
                            <div>
                                {module.lessons.map((lesson) => (
                                    <LessonItem
                                        key={lesson._id || lesson.id}
                                        lesson={lesson}
                                        currentLessonId={currentLessonId}
                                        courseSlug={courseSlug}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CurriculumAccordion;