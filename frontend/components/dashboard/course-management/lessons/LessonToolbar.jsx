"use client";

import Section from "@/components/sections/Section";
import { useParams, useRouter } from "next/navigation";
import {
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
    HiOutlineBars3BottomLeft,
} from "react-icons/hi2";


const LessonToolbar = () => {
    const { courseId } = useParams();
    const router = useRouter();

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
                        الدروس
                    </h2>
                    <span
                        className="
                            rounded-full

                            bg-primary/10

                            px-3
                            py-1

                            text-sm

                            font-medium

                            text-primary
                        "
                    >
                        24 درس
                    </span>
                </div>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    إدارة وترتيب محتوى الكورس.
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
                        placeholder="البحث عن درس..."
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
                    <option>
                        كل الدروس
                    </option>

                    <option>
                        فيديو
                    </option>

                    <option>
                        ملف
                    </option>

                    <option>
                        نص
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
                    إضافة درس
                </button>
            </div>
        </Section>
    );
};


export default LessonToolbar;