import LessonForm from "@/components/dashboard/course-management/lessons/LessonForm";
import { getCourseByIdAction } from "@/actions/courseActions";
import { notFound } from "next/navigation";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/courses/lessons/create",
        title: {
            ar: "إضافة درس جديد",
            en: "Create New Lesson",
        },
        noIndex: true,
    });
}

export default async function CreateLessonPage({
    params,
}) {
    const { courseId: courseReference } = await params;
    const result = await getCourseByIdAction(courseReference);
    const course = result.success ? result.data : null;

    if (!course) notFound();

    return (
        <LessonForm
            mode="create"
            courseId={course._id}
            courseSlug={course.slug || courseReference}
        />
    );
}
