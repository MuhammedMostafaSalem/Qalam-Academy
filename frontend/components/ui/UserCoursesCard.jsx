"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const UserCoursesCard = ({ course }) => {
    const { language, localize } = useLanguage();
    const rawImage = course?.image;
    const imageSrc = (rawImage && typeof rawImage === "string" && rawImage.trim() !== "")
        ? (rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`)
        : null;

    const courseSlugOrId = course?.slug || course?.id || "";

    const defaultTitle = language === "en" ? "Course" : "كورس";
    const title = localize(course?.title, defaultTitle);

    const rawInstructor = course?.instructor;
    const instructor = typeof rawInstructor === "string"
        ? rawInstructor
        : (typeof rawInstructor === "object" && rawInstructor ? `${rawInstructor.firstName || ''} ${rawInstructor.lastName || ''}`.trim() : "—");

    const progressText = language === "en" ? "Progress" : "التقدم";
    const openCourseText = language === "en" ? "Open Course" : "فتح الكورس";

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
            {/* Image */}
            <div
                className="
                    relative
                    h-44
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
            </div>

            {/* Content */}
            <div
                className="
                    p-4
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

                {/* Progress */}
                <div
                    className="
                        mt-4
                    "
                >
                    <div
                        className="
                            mb-2
                            flex
                            justify-between
                            text-xs
                        "
                    >
                        <span>
                            {progressText}
                        </span>

                        <span>
                            {course?.progress || 0}%
                        </span>
                    </div>

                    <div
                        className="
                            h-2
                            rounded-full
                            bg-background-alt
                            overflow-hidden
                        "
                    >
                        <div
                            className="
                                h-full
                                rounded-full
                                bg-primary
                            "
                            style={{
                                width: `${course?.progress || 0}%`,
                            }}
                        />
                    </div>
                </div>

                <Link
                    href={courseSlugOrId ? `/courses/${courseSlugOrId}` : "#"}
                    className="
                        mt-4
                        block
                        rounded-2xl
                        bg-primary
                        py-2.5
                        text-center
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                    "
                >
                    {openCourseText}
                </Link>
            </div>
        </div>
    );
};

export default UserCoursesCard;
