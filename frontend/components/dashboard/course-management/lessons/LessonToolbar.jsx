"use client";

import Section from "@/components/sections/Section";
import { useParams, useRouter } from "next/navigation";
import {
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const LessonToolbar = () => {
    const { courseId } = useParams();
    const router = useRouter();
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <Section
            className="
                mb-6
                flex
                flex-col
                gap-5

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            {/* Title */}
            <div>
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <h2
                        className="
                            text-xl
                            font-bold
                        "
                    >
                        {isEn ? "Lessons" : "الدروس"}
                    </h2>
                </div>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    {isEn ? "Manage and organize course curriculum." : "إدارة وترتيب محتوى الكورس."}
                </p>
            </div>

            {/* Actions */}
            <div
                className="
                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                "
            >
                {/* Search */}
                <div
                    className="
                        relative
                    "
                >
                    <HiOutlineMagnifyingGlass
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2

                            text-text-secondary
                        "
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder={isEn ? "Search lessons..." : "البحث عن درس..."}
                        className="
                            h-12

                            w-full
                            sm:w-64

                            rounded-2xl

                            border
                            border-border

                            bg-background

                            pr-11
                            pl-4

                            outline-none

                            transition

                            focus:border-primary
                        "
                    />
                </div>

                {/* Filter */}
                <select
                    className="
                        h-12

                        rounded-2xl

                        border
                        border-border

                        bg-background

                        px-4

                        outline-none

                        focus:border-primary
                    "
                >
                    <option value="">
                        {isEn ? "All Lessons" : "كل الدروس"}
                    </option>

                    <option value="video">
                        {isEn ? "Video" : "فيديو"}
                    </option>

                    <option value="file">
                        {isEn ? "File / PDF" : "ملف"}
                    </option>

                    <option value="text">
                        {isEn ? "Article / Text" : "نص"}
                    </option>
                </select>

                {/* Add */}
                <button
                    onClick={() => router.push(`/dashboard/courses/${courseId}/lessons/create`)}
                    className="
                        flex
                        h-12

                        items-center
                        justify-center

                        gap-2

                        rounded-2xl

                        bg-primary

                        px-5

                        text-white

                        transition

                        hover:opacity-90
                    "
                >
                    <HiOutlinePlus size={20} />
                    {isEn ? "Add Lesson" : "إضافة درس"}
                </button>
            </div>
        </Section>
    );
};

export default LessonToolbar;