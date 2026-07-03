"use client";

import { useState } from "react";
import {
    HiChevronDown,
    HiChevronUp,
} from "react-icons/hi2";
import LessonItem from "./LessonItem";
import curriculum from "./curriculum";

const CurriculumAccordion = () => {
    const [openModule, setOpenModule] = useState(0);

    const toggleModule = (index) => {
        setOpenModule(
            openModule === index
                ? null
                : index
        );
    };

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
                                        key={lesson.id}
                                        lesson={lesson}
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