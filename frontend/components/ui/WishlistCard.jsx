"use client";

import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineHeart,
    HiOutlineShoppingCart,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const WishlistCard = ({ course, onRemove }) => {
    const { language, localize } = useLanguage();
    const rawImage = course?.image || course?.thumbnail;
    const imageSrc = rawImage
        ? (rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`)
        : null;

    const defaultTitle = language === "en" ? "Course" : "كورس";
    const title = localize(course?.title, defaultTitle);

    const rawInstructor = course?.instructor;
    const instructor = typeof rawInstructor === "string"
        ? rawInstructor
        : (typeof rawInstructor === "object" && rawInstructor ? `${rawInstructor.firstName || ''} ${rawInstructor.lastName || ''}`.trim() : "—");

    const currencyText = language === "en" ? "EGP" : "ج.م";
    const viewText = language === "en" ? "View" : "عرض";
    const buyText = language === "en" ? "Buy" : "شراء";

    return (
        <div
            className="
                glass
                overflow-hidden
                rounded-3xl
                border
                border-border
                shadow-sm
                transition
                hover:-translate-y-1
            "
        >
            <div
                className="
                    relative
                    h-48
                    w-full
                    bg-card-hover
                "
            >
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="
                            object-cover
                        "
                        unoptimized
                    />
                ) : null}

                <button
                    onClick={onRemove}
                    className="
                        absolute
                        left-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-card
                        text-error
                        shadow
                        transition
                        hover:bg-error
                        hover:text-white
                    "
                >
                    <HiOutlineHeart
                        size={22}
                    />
                </button>
            </div>

            <div
                className="
                    p-5
                "
            >
                <h3
                    className="
                        line-clamp-2
                        min-h-12
                        font-bold
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-2
                        text-sm
                        text-text-secondary
                    "
                >
                    {instructor}
                </p>

                <div
                    className="
                        mt-4

                        flex

                        items-center

                        justify-between
                    "
                >
                    <span
                        className="
                            text-lg

                            font-bold

                            text-primary
                        "
                    >
                        {course.price} {currencyText}
                    </span>
                </div>

                <div
                    className="
                        mt-5

                        flex

                        gap-3
                    "
                >
                    <Link
                        href={`/courses/${course.slug || course._id}`}
                        className="
                            flex-1

                            rounded-2xl

                            border
                            border-border

                            py-2.5

                            text-center

                            text-sm

                            font-medium

                            transition

                            hover:bg-background-alt
                        "
                    >
                        {viewText}
                    </Link>

                    <button
                        className="
                            flex-1

                            flex

                            items-center
                            justify-center

                            gap-2

                            rounded-2xl

                            bg-primary

                            py-2.5

                            text-sm

                            font-medium

                            text-white

                            transition

                            hover:opacity-90
                        "
                    >
                        <HiOutlineShoppingCart size={18} />

                        {buyText}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default WishlistCard;
