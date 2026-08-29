"use client";

import Image from "next/image";
import Link from "next/link";
import {
    HiClock,
    HiBookOpen,
    HiShoppingCart,
    HiStar,
    HiUser,
} from "react-icons/hi";
import { useLanguage } from "@/providers/LanguageProvider";
import { addToCartAction } from "@/actions/cartActions";
import useToast from "@/hooks/useToast";
import { useState } from "react";

const CourseCard = ({ course }) => {
    const { language, localize } = useLanguage();
    const { successMessage, errorMessage } = useToast();
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const title = localize(course?.title, language === "en" ? "Course" : "كورس تعليمي");
    const description = localize(course?.description);

    const instructorName = typeof course?.instructor === "object"
        ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim()
        : (course?.instructor || "");

    const rawImage = course?.image || course?.thumbnail;
    const imageUrl = (typeof rawImage === "string" && rawImage.trim() !== "")
        ? (rawImage.startsWith('http') ? rawImage : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${rawImage}`)
        : '/assets/img-card.jpg';

    const currencyText = language === "en" ? "EGP" : "جنيه";
    const lessonText = language === "en" ? "lessons" : "درس";
    const reviewsText = language === "en" ? "reviews" : "تقييم";

    const handleAddToCart = async () => {
        const courseId = course?._id || course?.id;
        if (!courseId || isAddingToCart) return;

        setIsAddingToCart(true);
        try {
            const result = await addToCartAction(courseId, "Course");
            if (result.success) {
                successMessage(result.message || (language === "en" ? "Course added to cart" : "تمت إضافة الكورس إلى السلة"));
            } else {
                errorMessage(result.message || (language === "en" ? "Unable to add this course to the cart" : "تعذر إضافة الكورس إلى السلة"));
            }
        } catch {
            errorMessage(language === "en" ? "Please sign in before adding a course" : "يرجى تسجيل الدخول قبل إضافة الكورس");
        } finally {
            setIsAddingToCart(false);
        }
    };

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
                    alt={title}
                    width={500}
                    height={320}
                    unoptimized
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
                        <span>{course.lessons || course.totalLessons || 0} {lessonText}</span>
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
                        {title}
                    </h3>
                </Link>

                {/* Instructor */}
                {instructorName && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
                        <HiUser className="text-primary" />
                        <span>{instructorName}</span>
                    </div>
                )}

                {/* Description */}
                {description && (
                    <p
                        className="
                            mt-3
                            line-clamp-2
                            leading-7
                            text-text-secondary
                        "
                    >
                        {description}
                    </p>
                )}

                {/* Rating */}
                {course.rating > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <HiStar className="text-accent" />
                            <span className="font-semibold text-text-primary">
                                {course.rating.toFixed(1)}
                            </span>
                        </div>
                        {course.reviewsCount > 0 && (
                            <span className="text-sm text-text-secondary">
                                ({course.reviewsCount} {reviewsText})
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
                                {course.originalPrice} {currencyText}
                            </p>
                        )}

                        <p
                            className="
                                text-2xl
                                font-bold
                                text-primary
                            "
                        >
                            {course.price || 0} {currencyText}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={isAddingToCart || !(course?._id || course?.id)}
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
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                        aria-label={language === "en" ? "Add course to cart" : "إضافة الكورس إلى السلة"}
                        aria-busy={isAddingToCart}
                    >
                        <HiShoppingCart size={20} className={isAddingToCart ? "animate-pulse" : ""} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;
