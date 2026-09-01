import CourseLayout from "@/components/layout/dashboard/courseDetails/CourseLayout";
import { getCourseByIdAction } from "@/actions/courseActions";
import { notFound, redirect } from "next/navigation";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata({ params }) {
    const { courseId: courseReference } = await params;
    try {
        const result = await getCourseByIdAction(courseReference);
        const course = result?.success ? result.data : null;
        const title = course?.title || { ar: "تفاصيل الكورس", en: "Course Details" };
        return generateSEOMetadata({
            title,
            noIndex: true,
        });
    } catch {
        return generateSEOMetadata({
            title: { ar: "تفاصيل الكورس", en: "Course Details" },
            noIndex: true,
        });
    }
}

export default async function CoursePage({ params }) {
    const { courseId: courseReference } = await params;
    const result = await getCourseByIdAction(courseReference);
    const course = result.success ? result.data : null;

    if (!course) notFound();

    if (course.slug && courseReference !== course.slug) {
        redirect(`/dashboard/courses/${course.slug}`);
    }

    return (
        <CourseLayout
            courseId={course._id}
            courseSlug={course.slug || courseReference}
        />
    );
}
