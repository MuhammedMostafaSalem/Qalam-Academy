"use client";

import UserCoursesCard from "@/components/ui/UserCoursesCard";
import useMyCourses from "@/hooks/enrollments/useMyCourses";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const MyCoursesGrid = () => {
    const { language, localize } = useLanguage();
    const { courses, loading, error } = useMyCourses();
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const statusFilter = searchParams.get("status") || "all";

    if (loading) {
        return (
            <div className="flex-1 text-center py-10">
                <p className="text-text-secondary">
                    {language === "en" ? "Loading your courses..." : "جاري تحميل كورساتك..."}
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 text-center py-10">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <div className="flex-1 text-center py-10">
                <p className="text-text-muted">
                    {language === "en" ? "You have not enrolled in any courses yet" : "لم تشترك في أي كورسات بعد"}
                </p>
            </div>
        );
    }

    // Filter courses based on search query and status filter
    const filteredCourses = courses.filter((enrollment) => {
        const courseTitle = localize(enrollment.course?.title).toLowerCase();

        const instructorName = enrollment.course?.instructor
            ? `${enrollment.course.instructor.firstName || ''} ${enrollment.course.instructor.lastName || ''}`.toLowerCase()
            : "";

        const matchesSearch = !searchQuery || courseTitle.includes(searchQuery) || instructorName.includes(searchQuery);

        const progress = enrollment.progress || 0;
        let matchesStatus = true;
        if (statusFilter === "in_progress") {
            matchesStatus = progress < 100 && !enrollment.isCompleted;
        } else if (statusFilter === "completed") {
            matchesStatus = progress >= 100 || Boolean(enrollment.isCompleted);
        }

        return matchesSearch && matchesStatus;
    });

    if (filteredCourses.length === 0) {
        return (
            <div className="flex-1 text-center py-10">
                <p className="text-text-muted">
                    {language === "en" ? "No results match your search and filter criteria" : "لا توجد نتائج تطابق خيارات البحث والتصفية المختارة"}
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1">
            {/* Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredCourses.map((enrollment) => {
                    const defaultCourseTitle = language === "en" ? "Untitled Course" : "كورس بدون عنوان";
                    const courseTitle = localize(enrollment.course?.title, defaultCourseTitle);

                    return (
                        <UserCoursesCard
                            key={enrollment._id}
                            course={{
                                id: enrollment.course?._id,
                                title: courseTitle,
                                instructor: enrollment.course?.instructor
                                    ? `${enrollment.course.instructor.firstName || ''} ${enrollment.course.instructor.lastName || ''}`.trim()
                                    : "—",
                                progress: enrollment.progress || 0,
                                image: enrollment.course?.thumbnail,
                                slug: enrollment.course?.slug,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MyCoursesGrid;
