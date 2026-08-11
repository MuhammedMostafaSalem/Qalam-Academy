"use client";

import { fadeUp } from "@/lib/animationHelpers";
import CourseCard from "../../CourseCard";
import LoadMore from "../../../shared/LoadMore";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import { getCoursesAction } from "@/actions/courseActions";
import { useEffect, useState } from "react";

const CoursesGrid = ({ view }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getCoursesAction("isPublished=true").then((result) => {
            if (result.success) {
                setCourses(result.data);
            } else {
                setError(result.message);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex-1 py-16 text-center text-text-secondary">
                جاري تحميل الكورسات...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 py-16 text-center text-error">
                {error}
            </div>
        );
    }

    return (
        <div className="flex-1">
            {/* Result Count */}
            <div
                className="
                    mb-8
                    flex
                    items-center
                    justify-between
                "
            >
                <h2
                    {...heroAnimation.title}
                    className={`
                        text-2xl
                        font-bold
                        ${animations.transition}
                    `}
                >
                    جميع الكورسات
                </h2>

                <span
                    {...heroAnimation.badge}
                    className={`text-text-secondary ${animations.transition}`}
                >
                    {courses.length} دورة
                </span>
            </div>

            {courses.length === 0 ? (
                <div className="py-16 text-center text-text-muted">
                    لا توجد كورسات متاحة حالياً
                </div>
            ) : (
                <>
                    {/* Grid */}
                    <div
                        {...fadeUp()}
                        className={`
                            grid
                            gap-8
                            ${view === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                                : "grid-cols-1"
                            }
                        `}
                    >
                        {courses.map((course, index) => (
                            <div key={course._id} {...cardAnimation(index)}>
                                <CourseCard
                                    course={{
                                        image: course.thumbnail,
                                        title: course.title?.ar || course.title?.en || course.title,
                                        description: course.description?.ar || course.description?.en || course.description,
                                        slug: course.slug,
                                        duration: course.duration || "—",
                                        lessons: course.lessonsCount || 0,
                                        price: course.discountPrice || course.price || 0,
                                        originalPrice: course.discountPrice ? course.price : null,
                                        badge: course.discountPrice ? "خصم" : course.isFeatured ? "مميز" : null,
                                        badgeColor: course.discountPrice ? "bg-error" : course.isFeatured ? "bg-primary" : null,
                                        instructor: course.instructor
                                            ? `${course.instructor.firstName || ''} ${course.instructor.lastName || ''}`.trim()
                                            : null,
                                        rating: course.averageRating || 0,
                                        reviewsCount: course.reviewsCount || 0,
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div {...fadeUp()} className={`${animations.transition}`}>
                        <LoadMore />
                    </div>
                </>
            )}
        </div>
    );
};

export default CoursesGrid;