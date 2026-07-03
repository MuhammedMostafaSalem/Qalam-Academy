"use client";

import { useState } from "react";
import {
    HiChevronDown,
    HiChevronUp,
} from "react-icons/hi2";
import lessonData from "../lessonData";
import LessonItem from "./LessonItem";

const CurriculumAccordion = () => {
    const [openModule, setOpenModule] = useState(0);

    return (
        <div>
            {lessonData.modules.map((module, index) => {
                const opened = openModule === index;

                return (
                    <div
                        key={module.id}
                        className={`${index !== lessonData.modules.length - 1
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