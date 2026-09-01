"use client";

import { useState, useEffect } from "react";
import Section from "@/components/sections/Section";
import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineAcademicCap,
    HiOutlineCurrencyDollar,
    HiOutlinePencilSquare,
    HiOutlineUsers,
    HiOutlineVideoCamera,
} from "react-icons/hi2";
import { getCourseByIdAction } from "@/actions/courseActions";
import { useLanguage } from "@/providers/LanguageProvider";


const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";

const CourseHeader = ({ courseId, courseSlug }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!courseId) return;
        setLoading(true);
        getCourseByIdAction(courseId).then((result) => {
            if (result.success) {
                setCourse(result.data);
            }
            setLoading(false);
        });
    }, [courseId]);

    if (loading) {
        return (
            <Section
                className="
                    glass
                    rounded-3xl
                    border
                    border-border
                    p-6
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-6

                        xl:flex-row
                        xl:items-center
                        xl:justify-between
                    "
                >
                    {/* Skeleton - Course Info */}
                    <div
                        className="
                            flex
                            flex-col
                            gap-5

                            md:flex-row
                            md:items-center
                        "
                    >
                        {/* Skeleton Image */}
                        <div
                            className="
                                h-36
                                w-36

                                animate-pulse

                                rounded-3xl

                                bg-border
                            "
                        />

                        {/* Skeleton Details */}
                        <div className="space-y-3">
                            <div className="h-8 w-64 animate-pulse rounded-xl bg-border" />
                            <div className="h-4 w-96 animate-pulse rounded-lg bg-border" />
                            <div className="mt-6 flex gap-4">
                                <div className="h-10 w-24 animate-pulse rounded-xl bg-border" />
                                <div className="h-10 w-24 animate-pulse rounded-xl bg-border" />
                                <div className="h-10 w-24 animate-pulse rounded-xl bg-border" />
                            </div>
                        </div>
                    </div>

                    {/* Skeleton Button */}
                    <div className="h-12 w-36 animate-pulse rounded-2xl bg-border" />
                </div>
            </Section>
        );
    }

    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-6

                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                "
            >
                {/* Course Info */}
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
                    <img
                        src={course?.thumbnail || FALLBACK_IMAGE}
                        alt="Course"
                        width={160}
                        height={160}
                        className="
                            h-36
                            w-36

                            rounded-3xl

                            object-cover

                            border
                            border-border
                        "
                    />

                    {/* Details */}
                    <div>
                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            "
                        >
                            <h1
                                className="
                                    text-3xl
                                    font-bold
                                "
                            >
                                {localize(course?.title, isEn ? "Untitled Course" : "كورس بدون عنوان")}
                            </h1>

                            <span
                                className={`
                                    rounded-full

                                    px-4
                                    py-1.5

                                    text-sm

                                    font-medium

                                    ${course?.isPublished
                                        ? "bg-success/10 text-success"
                                        : "bg-warning/10 text-warning"
                                    }
                                `}
                            >
                                {course?.isPublished ? (isEn ? "Published" : "منشور") : (isEn ? "Draft" : "مسودة")}
                            </span>
                        </div>

                        <p
                            className="
                                mt-3
                                max-w-2xl

                                text-text-secondary
                            "
                        >
                            {localize(course?.description, "")}
                        </p>

                        {/* Stats */}
                        <div
                            className="
                                mt-6

                                grid

                                grid-cols-2
                                gap-4

                                sm:grid-cols-3
                            "
                        >
                            <StatCard
                                icon={HiOutlineVideoCamera}
                                label={isEn ? "Lessons" : "الدروس"}
                                value={course?.totalLessons ?? course?.lessonsCount ?? 0}
                            />
                            <StatCard
                                icon={HiOutlineUsers}
                                label={isEn ? "Students" : "الطلاب"}
                                value={course?.totalStudents ?? course?.studentsCount ?? 0}
                            />
                            <StatCard
                                icon={HiOutlineCurrencyDollar}
                                label={isEn ? "Price" : "السعر"}
                                value={`${course?.price || 0} ${isEn ? "EGP" : "ج.م"}`}
                            />
                        </div>
                    </div>
                </div>



                {/* Actions */}
                <div>
                    <Link
                        href={`/dashboard/courses/edit/${courseSlug || courseId}`}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2

                            rounded-2xl

                            bg-primary

                            px-6
                            py-3

                            text-white

                            transition

                            hover:opacity-90
                        "
                    >
                        <HiOutlinePencilSquare size={20} />
                        {isEn ? "Edit Course" : "تعديل الكورس"}
                    </Link>
                </div>
            </div>
        </Section>
    );
};



const StatCard = ({
    icon: Icon,
    label,
    value,
}) => {

    return (
        <div
            className="
                flex
                items-center
                gap-3
            "
        >
            <div
                className="
                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    bg-primary/10

                    text-primary
                "
            >
                <Icon size={20} />
            </div>

            <div>
                <p
                    className="
                        text-xs
                        text-text-secondary
                    "
                >
                    {label}
                </p>
                <h4
                    className="
                        font-semibold
                    "
                >
                    {value}
                </h4>
            </div>
        </div>
    );
};



export default CourseHeader;
