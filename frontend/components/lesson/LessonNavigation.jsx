"use client";

import Link from "next/link";
import {
    HiArrowLongLeft,
    HiArrowLongRight,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const LessonNavigation = ({ lesson, courseSlug, courseLessons = [] }) => {
    const { language, isRtl, localize } = useLanguage();

    if (!courseLessons || courseLessons.length === 0) {
        return null;
    }

    const currentId = String(lesson?._id || lesson?.id || "");
    const currentIndex = courseLessons.findIndex(
        (item) => String(item._id || item.id) === currentId
    );

    const previousLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
    const nextLesson = (currentIndex >= 0 && currentIndex < courseLessons.length - 1)
        ? courseLessons[currentIndex + 1]
        : null;

    if (!previousLesson && !nextLesson) {
        return null;
    }

    const defaultTitle = language === "en" ? "Lesson" : "درس";
    const getLessonTitle = (l) => localize(l?.title, defaultTitle);
    const getLessonId = (l) => l?._id || l?.id;

    const prevIcon = isRtl ? <HiArrowLongRight size={24} /> : <HiArrowLongLeft size={24} />;
    const nextIcon = isRtl ? <HiArrowLongLeft size={24} /> : <HiArrowLongRight size={24} />;

    return (
        <div
            className={`
                mt-12
                flex
                flex-col
                gap-5
                sm:flex-row
                ${previousLesson && nextLesson ? "sm:justify-between" : previousLesson ? "sm:justify-start" : "sm:justify-end"}
            `}
        >
            {/* Previous Lesson */}
            {previousLesson && (
                <Link
                    href={`/courses/${courseSlug}/lesson/${getLessonId(previousLesson)}`}
                    className="
                        group
                        flex
                        flex-1
                        items-center
                        justify-between
                        rounded-3xl
                        border
                        border-border
                        bg-card
                        p-6
                        transition-all
                        duration-300
                        hover:border-primary
                        hover:-translate-y-1
                    "
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                                text-primary
                                transition
                                group-hover:bg-primary
                                group-hover:text-white
                            "
                        >
                            {prevIcon}
                        </div>

                        <div>
                            <p className="text-sm text-text-secondary">
                                {language === "en" ? "Previous Lesson" : "الدرس السابق"}
                            </p>

                            <h3 className="mt-1 font-semibold">
                                {getLessonTitle(previousLesson)}
                            </h3>
                        </div>
                    </div>
                </Link>
            )}

            {/* Next Lesson */}
            {nextLesson && (
                <Link
                    href={`/courses/${courseSlug}/lesson/${getLessonId(nextLesson)}`}
                    className="
                        group
                        flex
                        flex-1
                        items-center
                        justify-between
                        rounded-3xl
                        border
                        border-border
                        bg-card
                        p-6
                        transition-all
                        duration-300
                        hover:border-primary
                        hover:-translate-y-1
                    "
                >
                    <div>
                        <p className="text-sm text-text-secondary">
                            {language === "en" ? "Next Lesson" : "الدرس التالي"}
                        </p>

                        <h3 className="mt-1 font-semibold">
                            {getLessonTitle(nextLesson)}
                        </h3>
                    </div>

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/10
                            text-primary
                            transition
                            group-hover:bg-primary
                            group-hover:text-white
                        "
                    >
                        {nextIcon}
                    </div>
                </Link>
            )}
        </div>
    );
};

export default LessonNavigation;