"use client";

import { useState } from "react";
import {
    HiChevronDown,
    HiChevronUp,
} from "react-icons/hi2";
import LessonItem from "./LessonItem";
import { useRouter } from "next/navigation";

const CurriculumAccordion = ({ course }) => {
    const router = useRouter();
    const [openModule, setOpenModule] = useState(0);

    // Group lessons (if they come as a flat array, display them in one section)
    // If the API provides lessons array directly in course
    const lessons = course?.lessons || [];

    const toggleModule = (index) => {
        setOpenModule(
            openModule === index
                ? null
                : index
        );
    };

    // If there are no lessons, show a message
    if (!lessons || lessons.length === 0) {
        return (
            <div className="py-16 text-center text-text-secondary">
                لا توجد دروس متاحة حالياً
            </div>
        );
    }

    // For now, display all lessons in a single module
    // You can enhance this later to group by sections/modules
    const curriculum = [
        {
            id: 1,
            title: "دروس الكورس",
            lessons: lessons,
            duration: course?.duration || "—",
        }
    ];

    return (
        <div className="space-y-5">
            {curriculum.map((module, index) => {
                const opened = openModule === index;

                return (
                    <div
                        key={module.id}
                        className="
                            overflow-hidden
                            rounded-3xl
                            border
                            border-border
                            bg-card
                        "
                    >
                        <button
                            onClick={() => toggleModule(index)}
                            className="
                                flex
                                w-full
                                items-center
                                justify-between
                                p-6
                                text-right
                            "
                        >
                            <div>
                                <h3 className="text-xl font-bold">
                                    {module.title}
                                </h3>

                                <p className="mt-2 text-sm text-text-secondary">
                                    {module.lessons.length} دروس
                                    • {module.duration}
                                </p>
                            </div>

                            {opened
                                ? <HiChevronUp size={24} />
                                : <HiChevronDown size={24} />
                            }
                        </button>

                        {opened && (
                            <div className="border-t border-border">
                                {module.lessons.map((lesson) => (
                                    <LessonItem
                                        key={lesson._id}
                                        lesson={{
                                            id: lesson._id,
                                            title: lesson.title?.ar || lesson.title?.en || lesson.title,
                                            duration: lesson.duration || "—",
                                            preview: lesson.isPreview || false,
                                        }}
                                        onclick={() => router.push(`/courses/${course.slug}/lesson/${lesson._id}`)}
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