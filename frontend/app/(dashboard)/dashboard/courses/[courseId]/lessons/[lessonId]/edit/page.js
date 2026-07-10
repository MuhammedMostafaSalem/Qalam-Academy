import LessonForm from "@/components/dashboard/course-management/lessons/LessonForm";

export default async function EditLessonPage({
    params,
}) {
    const { lessonId } = await params;

    // مؤقتًا بيانات ثابتة
    // لاحقًا هتجيبها من الـ API
    const lesson = {
        id: lessonId,
        title: "Introduction to React",
        description: "تعرف على أساسيات React وكيفية إنشاء أول Component.",
        type: "Video",
        duration: "20:30",
        status: "Published",
        videoUrl: "https://example.com/video.mp4",
        isFree: true,
    };

    return (
        <LessonForm
            mode="edit"
            lesson={lesson}
        />
    );
}