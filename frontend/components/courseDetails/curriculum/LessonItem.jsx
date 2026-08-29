"use client";

import {
    HiOutlineLockClosed,
    HiOutlinePlayCircle,
    HiOutlineClock,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const LessonItem = ({
    lesson,
    onclick
}) => {
    const { language, localize } = useLanguage();
    const title = localize(lesson?.title, language === "en" ? "Lesson" : "درس");

    return (
        <div
            onClick={onclick}
            className="
                flex
                items-center
                justify-between
                border-b
                border-border
                px-6
                py-5
                last:border-none
                hover:bg-card-hover
                transition-colors
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >
                {lesson.preview
                    ? (
                        <HiOutlinePlayCircle
                            size={24}
                            className="text-primary"
                        />
                    )
                    : (
                        <HiOutlineLockClosed
                            size={22}
                            className="text-text-secondary"
                        />
                    )
                }

                <div>
                    <h4 className="font-medium">
                        {title}
                    </h4>

                    {lesson.preview && (
                        <span
                            className="
                                mt-1
                                inline-block
                                rounded-full
                                bg-primary/10
                                px-3
                                py-1
                                text-xs
                                text-primary
                            "
                        >
                            {language === "en" ? "Free Preview" : "معاينة مجانية"}
                        </span>
                    )}
                </div>
            </div>

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-text-secondary
                "
            >
                <HiOutlineClock />

                {lesson.duration}
            </div>
        </div>
    );
};

export default LessonItem;
