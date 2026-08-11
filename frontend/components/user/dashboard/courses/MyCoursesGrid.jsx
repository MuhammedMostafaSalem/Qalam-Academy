"use client";

import LoadMore from "@/components/shared/LoadMore";
import UserCoursesCard from "@/components/ui/UserCoursesCard";
import useMyCourses from "@/hooks/enrollments/useMyCourses";

const MyCoursesGrid = () => {
    const { courses, loading, error, refetch } = useMyCourses();

    if (loading) {
        return (
            <div className="flex-1 text-center py-10">
                <p className="text-text-secondary">جاري تحميل كورساتك...</p>
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

    if (courses.length === 0) {
        return (
            <div className="flex-1 text-center py-10">
                <p className="text-text-muted">لم تشترك في أي كورسات بعد</p>
            </div>
        );
    }

    return (
        <div className="flex-1">
            {/* Grid */}
            <div
                className={`
                    grid
                    gap-8
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                `}
            >
                {courses.map((enrollment) => (
                    <UserCoursesCard
                        key={enrollment._id}
                        course={{
                            id: enrollment.course?._id,
                            title: enrollment.course?.title,
                            instructor: enrollment.course?.instructor
                                ? `${enrollment.course.instructor.firstName} ${enrollment.course.instructor.lastName}`
                                : "—",
                            progress: enrollment.progress || 0,
                            image: enrollment.course?.thumbnail,
                            slug: enrollment.course?.slug,
                        }}
                    />
                ))}
            </div>

            <LoadMore />
        </div>
    );
};

export default MyCoursesGrid;