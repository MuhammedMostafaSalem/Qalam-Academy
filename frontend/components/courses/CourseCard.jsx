import Image from "next/image";
import Link from "next/link";

import {
    HiClock,
    HiBookOpen,
    HiShoppingCart,
} from "react-icons/hi";

const CourseCard = ({ course }) => {
    return (
        <article
            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-background-alt
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary/40
                hover:shadow-xl
                hover:shadow-primary/10
            "
        >
            {/* Image */}

            <div className="relative overflow-hidden">

                <Image
                    src={course.image}
                    alt={course.title}
                    width={500}
                    height={320}
                    className="
                        h-56
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />

                {course.badge && (
                    <span
                        className={`
                            absolute
                            left-4
                            top-4
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            bg-error
                            ${course.badgeColor}
                        `}
                    >
                        {course.badge}
                    </span>
                )}

            </div>

            {/* Content */}

            <div className="p-6">

                {/* Meta */}

                <div
                    className="
                        mb-4
                        flex
                        items-center
                        justify-between
                        text-sm
                        text-text-secondary
                    "
                >
                    <div className="flex items-center gap-2">
                        <HiClock className="text-primary" />
                        <span>{course.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <HiBookOpen className="text-primary" />
                        <span>{course.lessons} درس</span>
                    </div>
                </div>

                {/* Title */}

                <Link href={`/courses/${course.slug}`}>
                    <h3
                        className="
                            line-clamp-2
                            text-xl
                            font-bold
                            text-text-primary
                            transition-colors
                            duration-300
                            group-hover:text-primary
                        "
                    >
                        {course.title}
                    </h3>
                </Link>

                {/* Description */}

                <p
                    className="
                        mt-3
                        line-clamp-2
                        leading-7
                        text-text-secondary
                    "
                >
                    {course.description}
                </p>

                {/* Footer */}

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div>

                        {course.oldPrice && (
                            <p
                                className="
                                    text-sm
                                    text-text-secondary
                                    line-through
                                "
                            >
                                {course.oldPrice} جنيه
                            </p>
                        )}

                        <p
                            className="
                                text-2xl
                                font-bold
                                text-primary
                            "
                        >
                            {course.price} جنيه
                        </p>

                    </div>

                    <button
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary
                            text-white
                            transition-all
                            duration-300
                            hover:scale-110
                        "
                    >
                        <HiShoppingCart size={20} />
                    </button>

                </div>

            </div>

        </article>
    );
}

export default CourseCard