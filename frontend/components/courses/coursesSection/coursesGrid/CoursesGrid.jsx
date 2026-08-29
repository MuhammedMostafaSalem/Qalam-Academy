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
import { useLanguage } from "@/providers/LanguageProvider";

const CoursesGrid = ({ view }) => {
    const { language, localize } = useLanguage();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const levelFilter = searchParams.get("level") || "all";
    const categoryFilter = searchParams.get("category") || "all";
    const sortFilter = searchParams.get("sort") || "newest";
    const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getCoursesAction(`isPublished=true&limit=${limit}`).then((result) => {
            if (result.success) {
                setCourses(result.data || []);
                setMeta(result.meta || null);
            } else {
                setError(result.message);
            }
            setLoading(false);
        });
    }, [language, limit]);

    if (loading) {
        return (
            <div className="flex-1 py-16 text-center text-text-secondary">
                {language === "en" ? "Loading courses..." : "جاري تحميل الكورسات..."}
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
        const titleStr = localize(course.title).toLowerCase();
        const descStr = localize(course.description).toLowerCase();

        const matchesSearch = !searchQuery || titleStr.includes(searchQuery) || descStr.includes(searchQuery);

        const courseLevel = (course.level || "").toLowerCase();
        const matchesLevel = levelFilter === "all" || courseLevel === levelFilter;
        const courseCategory = course.category?._id || course.category;
        const matchesCategory = categoryFilter === "all" || courseCategory === categoryFilter;

        return matchesSearch && matchesLevel && matchesCategory;
    });

    // Sort courses
    if (sortFilter === "price_asc") {
        filteredCourses.sort((a, b) => (a.discountPrice || a.price || 0) - (b.discountPrice || b.price || 0));
    } else if (sortFilter === "price_desc") {
        filteredCourses.sort((a, b) => (b.discountPrice || b.price || 0) - (a.discountPrice || a.price || 0));
    }

    const allCoursesTitle = language === "en" ? "All Courses" : "جميع الكورسات";
    const coursesCountSuffix = language === "en" ? "courses" : "دورة";
    const noCoursesMsg = language === "en"
        ? "No courses match your filter and search criteria"
        : "لا توجد كورسات متاحة تطابق خيارات التصفية والبحث";
    const discountBadge = language === "en" ? "Sale" : "خصم";
    const featuredBadge = language === "en" ? "Featured" : "مميز";

    return (
        <div className="flex-1">
            {/* Result Count */}
            <div className="mb-8 flex items-center justify-between">
                <h2
                    {...heroAnimation.title}
                    className={`text-2xl font-bold ${animations.transition}`}
                >
                    {allCoursesTitle}
                </h2>

                <span
                    {...heroAnimation.badge}
                    className={`text-text-secondary ${animations.transition}`}
                >
                    {filteredCourses.length} {coursesCountSuffix}
                </span>
            </div>

            {filteredCourses.length === 0 ? (
                <div className="py-16 text-center text-text-muted">
                    {noCoursesMsg}
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
                                        _id: course._id,
                                        image: course.thumbnail,
                                        title: course.title,
                                        description: course.description,
                                        slug: course.slug,
                                        duration: course.duration || "—",
                                        lessons: course.totalLessons || course.lessonsCount || 0,
                                        price: course.discountPrice || course.price || 0,
                                        originalPrice: course.discountPrice ? course.price : null,
                                        badge: course.discountPrice ? discountBadge : course.isFeatured ? featuredBadge : null,
                                        badgeColor: course.discountPrice ? "bg-error" : course.isFeatured ? "bg-primary" : null,
                                        instructor: course.instructor
                                            ? `${course.instructor.firstName || ''} ${course.instructor.lastName || ''}`.trim()
                                            : null,
                                        rating: course.averageRating || 0,
                                        reviewsCount: course.totalReviews || 0,
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {meta?.hasMore && (
                        <div {...fadeUp()} className={`${animations.transition}`}>
                            <LoadMore />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CoursesGrid;
