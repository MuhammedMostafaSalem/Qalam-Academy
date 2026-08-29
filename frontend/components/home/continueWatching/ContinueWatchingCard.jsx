"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlinePlay, HiOutlineClock } from "react-icons/hi2";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import { useLanguage } from "@/providers/LanguageProvider";

const ContinueWatchingCard = ({ course, index }) => {
    const { language, localize } = useLanguage();
    const courseData = course.course || course;
    const defaultTitle = language === "en" ? "Course" : "دورة تعليمية";
    const title = localize(courseData.title, defaultTitle);
    const thumbnail = (courseData.thumbnail && typeof courseData.thumbnail === 'string' && courseData.thumbnail.trim() !== '')
        ? (courseData.thumbnail.startsWith('http')
            ? courseData.thumbnail
            : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${courseData.thumbnail}`)
        : '/assets/img-card.jpg';

    const progress = course.progress || 0;
    const lastLesson = course.lastLesson;
    const defaultLessonTitle = language === "en" ? "Next Lesson" : "الدرس التالي";
    const lastLessonTitle = localize(lastLesson?.title, defaultLessonTitle);

    return (
        <Link
            href={
                lastLesson
                    ? `/courses/${courseData.slug}/lesson/${lastLesson._id}`
                    : `/courses/${courseData.slug || '#'}`
            }
            {...cardAnimation(index)}
        >
            <article
                className="
                    group
                    relative
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
                {/* Image with Progress Overlay */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={500}
                        height={280}
                        unoptimized
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />

                    {/* Play Button Overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/40
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                        "
                    >
                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-primary
                                text-white
                                shadow-2xl
                            "
                        >
                            <HiOutlinePlay size={28} className="translate-x-[2px]" />
                        </div>
                    </div>

                    {/* Progress Bar at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/50">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-bold text-text-primary">
                        {title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineClock className="text-primary" />
                        <span className="line-clamp-1">{lastLessonTitle}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                            {Math.round(progress)}% {language === "en" ? "completed" : "مكتمل"}
                        </span>
                        <span className="text-xs text-text-secondary">
                            {language === "en" ? "Continue learning" : "استمر في التعلم"}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ContinueWatchingCard;
