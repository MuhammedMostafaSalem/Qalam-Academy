"use client";

import {
    HiCheckCircle,
    HiLockClosed,
    HiPlayCircle,
} from "react-icons/hi2";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

const LessonItem = ({ lesson, currentLessonId, courseSlug }) => {
    const { language, localize } = useLanguage();
    const lessonId = lesson?._id || lesson?.id;
    const isCompleted = lesson?.isCompleted || false;
    const isActive = String(lessonId) === String(currentLessonId);
    const isLocked = lesson?.canAccess === false;
    const defaultTitle = language === "en" ? "Lesson" : "درس";
    const title = localize(lesson?.title, defaultTitle);
    const minText = language === "en" ? "min" : "دقيقة";
    const duration = lesson?.duration ? `${lesson.duration} ${minText}` : "—";

    return (
        <Link
            href={`/courses/${courseSlug}/lesson/${lessonId}`}
            className={`
                block
                w-full
                border-r-4
                px-6
                py-4
                text-right
                transition

                ${isActive
                    ? "border-primary bg-primary/5 font-medium"
                    : "border-transparent hover:bg-background-alt"
                }
                
                ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={(e) => {
                if (isLocked) {
                    e.preventDefault();
                }
            }}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                {isCompleted ? (
                    <HiCheckCircle
                        className="text-success shrink-0"
                        size={22}
                    />
                ) : isLocked ? (
                    <HiLockClosed
                        className="text-text-secondary shrink-0"
                        size={20}
                    />
                ) : (
                    <HiPlayCircle
                        className="text-primary shrink-0"
                        size={22}
                    />
                )}

                <div className="flex-1 min-w-0">
                    <h4 className="truncate text-sm">
                        {title}
                    </h4>

                    <p className="mt-1 text-xs text-text-secondary">
                        {duration}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default LessonItem;
