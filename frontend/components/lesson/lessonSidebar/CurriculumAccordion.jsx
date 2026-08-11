"use client";

import { useState } from "react";
import {
    HiChevronDown,
    HiChevronUp,
} from "react-icons/hi2";
import LessonItem from "./LessonItem";

const CurriculumAccordion = ({ courseProgress, currentLessonId, courseSlug }) => {
    const [openModule, setOpenModule] = useState(0);

    const lessons = courseProgress?.lessons || [];
    
    if (lessons.length === 0) {
        return (
            <div className="p-6 text-center text-text-secondary">
                لا توجد دروس متاحة
            </div>
        );
    }

    // For now, display all lessons in one module
    // You can enhance this later to group by sections
    const modules = [
        {
            id: 1,
            title: "دروس الكورس",
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
                                    {module.lessons.length} درس
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
                                        key={lesson._id}
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