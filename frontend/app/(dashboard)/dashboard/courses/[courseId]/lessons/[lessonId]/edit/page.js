import LessonForm from "@/components/dashboard/course-management/lessons/LessonForm";
import { getLessonByIdAction } from "@/actions/lessonActions";
import { getCourseByIdAction } from "@/actions/courseActions";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/courses/lessons/edit",
        title: {
            ar: "تعديل الدرس",
            en: "Edit Lesson",
        },
        noIndex: true,
    });
}

export default async function EditLessonPage({ params }) {
    const { lessonId, courseId: courseReference } = await params;

    const [lessonResult, courseResult] = await Promise.all([
        getLessonByIdAction(lessonId),
        getCourseByIdAction(courseReference),
    ]);
    const lesson = lessonResult.success ? lessonResult.data : null;
    const course = courseResult.success ? courseResult.data : null;

    if (!lesson || !course) {
        return (
            <div className="glass rounded-3xl border border-border p-6 shadow-sm">
                <p className="text-center text-error">لم يتم العثور على الدرس</p>
            </div>
        );
    }

    return (
        <LessonForm
            mode="edit"
            lesson={lesson}
            courseId={course._id}
            courseSlug={course.slug || courseReference}
        />
    );
}
