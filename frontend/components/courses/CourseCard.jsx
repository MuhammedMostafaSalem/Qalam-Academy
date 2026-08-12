import Image from "next/image";
import Link from "next/link";

import {
    HiClock,
    HiBookOpen,
    HiShoppingCart,
    HiStar,
    HiUser,
} from "react-icons/hi";

const CourseCard = ({ course }) => {
    // Handle image URL - string URLs or imported static assets
    const rawImage = course.image;
    const imageUrl = typeof rawImage === "string"
        ? rawImage.startsWith('http')
            ? rawImage
            : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${rawImage}`
        : rawImage || '/assets/img-card.jpg';

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
                    src={imageUrl}
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
                            text-white
                            ${course.badgeColor || 'bg-error'}
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
                        <span>{course.duration || '—'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <HiBookOpen className="text-primary" />
                        <span>{course.lessons || 0} درس</span>
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

                {/* Instructor */}
                {course.instructor && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
                        <HiUser className="text-primary" />
                        <span>{course.instructor}</span>
                    </div>
                )}

                {/* Description */}
                {course.description && (
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
                )}

                {/* Rating */}
                {course.rating > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <HiStar className="text-yellow-500" />
                            <span className="font-semibold text-text-primary">
                                {course.rating.toFixed(1)}
                            </span>
                        </div>
                        {course.reviewsCount > 0 && (
                            <span className="text-sm text-text-secondary">
                                ({course.reviewsCount} تقييم)
                            </span>
                        )}
                    </div>
                )}

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
                        {course.originalPrice && course.originalPrice > course.price && (
                            <p
                                className="
                                    text-sm
                                    text-text-secondary
                                    line-through
                                "
                            >
                                {course.originalPrice} جنيه
                            </p>
                        )}

                        <p
                            className="
                                text-2xl
                                font-bold
                                text-primary
                            "
                        >
                            {course.price || 0} جنيه
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
                        aria-label="أضف إلى السلة"
                    >
                        <HiShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </article>
    );
}

export default CourseCard