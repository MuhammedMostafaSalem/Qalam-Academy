"use client";

import Link from "next/link";
import Section from "@/components/sections/Section";
import UserCoursesCard from "@/components/ui/UserCoursesCard";
import useMyCourses from "@/hooks/enrollments/useMyCourses";

const MyCoursesPreview = () => {
    const { courses, loading, error } = useMyCourses();

    if (loading) {
        return (
            <Section className="space-y-5">
                <div className="py-6 text-center text-text-secondary text-sm">
                    جاري تحميل كورساتك...
                </div>
            </Section>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <Section className="space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">كورساتي</h2>
                        <p className="mt-1 text-sm text-text-secondary">الكورسات التي بدأت تعلمها</p>
                    </div>
                </div>
                <div className="py-6 text-center text-text-muted text-sm glass rounded-2xl p-6">
                    لم تشترك في أي كورسات بعد
                </div>
            </Section>
        );
    }

    const previewCourses = courses.slice(0, 4);

    return (
        <Section className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">كورساتي</h2>
                    <p className="mt-1 text-sm text-text-secondary">الكورسات التي بدأت تعلمها</p>
                </div>

                <Link
                    href="/user/my-courses"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    عرض الكل
                </Link>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {previewCourses.map((enrollment) => {
                    const courseTitle = typeof enrollment.course?.title === "object"
                        ? (enrollment.course.title.ar || enrollment.course.title.en)
                        : enrollment.course?.title || "كورس بدون عنوان";

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
        </Section>
    );
};

export default MyCoursesPreview;