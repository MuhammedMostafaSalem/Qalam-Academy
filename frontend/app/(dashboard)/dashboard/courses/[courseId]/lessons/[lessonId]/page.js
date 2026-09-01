import LessonPreview from "@/components/dashboard/course-management/lessons/LessonPreview";
import { getLessonByIdAction } from "@/actions/lessonActions";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata({ params }) {
    const { lessonId } = await params;
    try {
        const result = await getLessonByIdAction(lessonId);
        const lesson = result?.data;
        return generateSEOMetadata({
            title: lesson?.title || { ar: "معاينة الدرس", en: "Lesson Preview" },
            noIndex: true,
        });
    } catch {
        return generateSEOMetadata({
            title: { ar: "معاينة الدرس", en: "Lesson Preview" },
            noIndex: true,
        });
    }
}

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