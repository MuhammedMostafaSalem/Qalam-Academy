"use client";

import { fadeUp } from "@/lib/animationHelpers";
import CourseCard from "../../CourseCard";
import LoadMore from "../../../shared/LoadMore";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import { getCoursesAction } from "@/actions/courseActions";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const CoursesGrid = ({ view }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const levelFilter = searchParams.get("level") || "all";
    const sortFilter = searchParams.get("sort") || "newest";

    useEffect(() => {
        setLoading(true);
        getCoursesAction("isPublished=true").then((result) => {
            if (result.success) {
                setCourses(result.data || []);
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

    // Filter courses based on URL parameters
    let filteredCourses = courses.filter((course) => {
        const titleStr = (typeof course.title === "object"
            ? (course.title.ar || course.title.en)
            : course.title || "").toLowerCase();

        const descStr = (typeof course.description === "object"
            ? (course.description.ar || course.description.en)
            : course.description || "").toLowerCase();

        const matchesSearch = !searchQuery || titleStr.includes(searchQuery) || descStr.includes(searchQuery);

        const courseLevel = (course.level || "").toLowerCase();
        const matchesLevel = levelFilter === "all" || courseLevel === levelFilter;

        return matchesSearch && matchesLevel;
    });

    // Sort courses
    if (sortFilter === "price_asc") {
        filteredCourses.sort((a, b) => (a.discountPrice || a.price || 0) - (b.discountPrice || b.price || 0));
    } else if (sortFilter === "price_desc") {
        filteredCourses.sort((a, b) => (b.discountPrice || b.price || 0) - (a.discountPrice || a.price || 0));
    }

    return (
        <div className="flex-1">
            {/* Result Count */}
            <div className="mb-8 flex items-center justify-between">
                <h2
                    {...heroAnimation.title}
                    className={`text-2xl font-bold ${animations.transition}`}
                >
                    جميع الكورسات
                </h2>

                <span
                    {...heroAnimation.badge}
                    className={`text-text-secondary ${animations.transition}`}
                >
                    {filteredCourses.length} دورة
                </span>
            </div>

            {filteredCourses.length === 0 ? (
                <div className="py-16 text-center text-text-muted">
                    لا توجد كورسات متاحة تطابق خيارات التصفية والبحث
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
                        {filteredCourses.map((course, index) => (
                            <div key={course._id} {...cardAnimation(index)}>
                                <CourseCard
                                    course={{
                                        image: course.thumbnail,
                                        title: course.title?.ar || course.title?.en || course.title,
                                        description: course.description?.ar || course.description?.en || course.description,
                                        slug: course.slug,
                                        duration: course.duration || "—",
                                        lessons: course.totalLessons || course.lessonsCount || 0,
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