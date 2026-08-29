"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/sections/Section";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { getContinueWatchingAction } from "@/actions/progressActions";
import { useLanguage } from "@/providers/LanguageProvider";

const ContinueLearning = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const [continueWatching, setContinueWatching] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContinueWatching = async () => {
            try {
                const result = await getContinueWatchingAction();
                if (result.success && result.data && result.data.length > 0) {
                    // Get the most recent course
                    setContinueWatching(result.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch continue watching:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContinueWatching();
    }, []);

    // Don't show if no course to continue
    if (loading || !continueWatching) {
        return null;
    }

    const courseData = continueWatching.course;
    const defaultCourseTitle = isEn ? "Course" : "دورة تعليمية";
    const title = localize(courseData?.title, defaultCourseTitle);

    const thumbnail = (courseData?.thumbnail && typeof courseData.thumbnail === 'string' && courseData.thumbnail.trim() !== '')
        ? (courseData.thumbnail.startsWith('http')
            ? courseData.thumbnail
            : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${courseData.thumbnail}`)
        : '/assets/img-card.jpg';

    const progress = continueWatching.progress || 0;
    const lastLesson = continueWatching.lastLesson;
    const defaultLessonTitle = isEn ? "Next Lesson" : "الدرس التالي";
    const lastLessonTitle = localize(lastLesson?.title, defaultLessonTitle);
    
    const continueUrl = lastLesson
        ? `/courses/${courseData.slug}/lesson/${lastLesson._id}`
        : `/courses/${courseData.slug}`;

    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            {/* Header */}
            <div
                className="
                    mb-5
                    flex
                    items-center
                    justify-between
                "
            >
                <div>
                    <h2 className="text-xl font-bold">
                        {isEn ? "Continue Learning" : "أكمل تعلمك"}
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        {isEn ? "Resume from where you left off" : "تابع من حيث توقفت"}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div
                className="
                    flex
                    flex-col
                    gap-5
                    md:flex-row
                    md:items-center
                "
            >
                {/* Image */}
                <div
                    className="
                        relative
                        h-48
                        w-full
                        overflow-hidden
                        rounded-2xl
                        md:h-36
                        md:w-60
                    "
                >
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold">
                        {title}
                    </h3>

                    <p className="mt-2 text-sm text-text-secondary">
                        {lastLessonTitle}
                    </p>

                    {/* Progress */}
                    <div className="mt-5">
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                justify-between
                                text-sm
                            "
                        >
                            <span>{isEn ? "Progress" : "التقدم"}</span>

                            <span className="font-medium">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        <div
                            className="
                                h-2
                                overflow-hidden
                                rounded-full
                                bg-background-alt
                            "
                        >
                            <div
                                className="
                                    h-full
                                    rounded-full
                                    bg-primary
                                    transition-all
                                "
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <Link
                        href={continueUrl}
                        className="
                            mt-5
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-primary
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:opacity-90
                            w-fit
                        "
                    >
                        <HiOutlinePlayCircle size={20} />
                        {isEn ? "Continue Learning" : "متابعة التعلم"}
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default ContinueLearning;