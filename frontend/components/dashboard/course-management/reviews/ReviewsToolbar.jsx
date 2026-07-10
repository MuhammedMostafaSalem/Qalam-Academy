import Section from "@/components/sections/Section";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const ReviewsToolbar = () => {
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
                        تقييمات الكورس
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
                        84 تقييم
                    </span>
                </div>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    جميع تقييمات وآراء الطلاب حول الكورس.
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
                        placeholder="ابحث عن طالب..."
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
                    <option>جميع التقييمات</option>
                    <option>5 نجوم</option>
                    <option>4 نجوم</option>
                    <option>3 نجوم</option>
                    <option>2 نجوم</option>
                    <option>1 نجمة</option>
                </select>
            </div>
        </Section>
    );
};

export default ReviewsToolbar;