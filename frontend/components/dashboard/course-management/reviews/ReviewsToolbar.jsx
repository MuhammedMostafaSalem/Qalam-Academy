"use client";

import Section from "@/components/sections/Section";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const ReviewsToolbar = () => {
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
                        {isEn ? "Course Reviews" : "تقييمات الكورس"}
                    </h2>
                </div>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    {isEn ? "All student ratings and feedback for this course." : "جميع تقييمات وآراء الطلاب حول الكورس."}
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
                        placeholder={isEn ? "Search student..." : "ابحث عن طالب..."}
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
                    <option value="">{isEn ? "All Reviews" : "جميع التقييمات"}</option>
                    <option value="5">{isEn ? "5 Stars" : "5 نجوم"}</option>
                    <option value="4">{isEn ? "4 Stars" : "4 نجوم"}</option>
                    <option value="3">{isEn ? "3 Stars" : "3 نجوم"}</option>
                    <option value="2">{isEn ? "2 Stars" : "2 نجوم"}</option>
                    <option value="1">{isEn ? "1 Star" : "1 نجمة"}</option>
                </select>
            </div>
        </Section>
    );
};

export default ReviewsToolbar;