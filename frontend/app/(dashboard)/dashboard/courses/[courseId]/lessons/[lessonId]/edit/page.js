import LessonForm from "@/components/dashboard/course-management/lessons/LessonForm";
import { getLessonByIdAction } from "@/actions/lessonActions";

export default async function EditLessonPage({ params }) {
    const { lessonId, courseId } = await params;

    const result = await getLessonByIdAction(lessonId);
    const lesson = result.success ? result.data : null;

    if (!lesson) {
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
            courseId={courseId}
        />
    );
}