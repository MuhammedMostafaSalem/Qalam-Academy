"use client";

import Section from "@/components/sections/Section";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const StudentsToolbar = () => {
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
                        {isEn ? "Enrolled Students" : "الطلاب المسجلون"}
                    </h2>
                </div>

                <p
                    className="
                        mt-2
                        text-sm
                        text-text-secondary
                    "
                >
                    {isEn ? "All students currently enrolled in this course." : "جميع الطلاب المشتركين في هذا الكورس."}
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
                <div className="relative">
                    <HiOutlineMagnifyingGlass
                        size={20}
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-text-secondary
                        "
                    />

                    <input
                        type="text"
                        placeholder={isEn ? "Search student..." : "البحث عن طالب..."}
                        className="
                            h-12
                            w-full
                            sm:w-72

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
                    <option value="">{isEn ? "All Students" : "جميع الطلاب"}</option>
                    <option value="active">{isEn ? "Active" : "نشط"}</option>
                    <option value="inactive">{isEn ? "Inactive" : "غير نشط"}</option>
                    <option value="completed">{isEn ? "Completed Course" : "أكمل الكورس"}</option>
                    <option value="in_progress">{isEn ? "In Progress" : "قيد الدراسة"}</option>
                </select>
            </div>
        </Section>
    );
};

export default StudentsToolbar;