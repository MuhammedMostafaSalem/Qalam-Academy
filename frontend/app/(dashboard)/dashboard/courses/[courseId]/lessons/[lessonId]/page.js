import LessonPreview from "@/components/dashboard/course-management/lessons/LessonPreview";
import { getLessonByIdAction } from "@/actions/lessonActions";

export default async function LessonPreviewPage({
    params,
}) {
    const { lessonId } = await params;

    const result = await getLessonByIdAction(lessonId);
    const lesson = result.data;

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <p className="text-xl font-semibold text-text-secondary">
                    لم يتم العثور على الدرس.
                </p>
            </div>
        );
    }

    return (
        <LessonPreview lesson={lesson} />
    );
}