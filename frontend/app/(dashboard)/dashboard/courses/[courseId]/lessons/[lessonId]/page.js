import LessonPreview from "@/components/dashboard/course-management/lessons/LessonPreview";

export default async function LessonPreviewPage({
    params,
}) {
    const { lessonId } = await params;

    // مؤقتًا بيانات ثابتة
    // لاحقًا هتجيبها من الـ API باستخدام lessonId
    const lesson = {
        id: lessonId,
        title: "Introduction to React",
        description: "تعرف على أساسيات React وكيفية إنشاء أول Component.",
        type: "Video",
        duration: "20:30",
        status: "Published",
        videoUrl: "/videos/react-introduction.mp4",
    };

    return (
        <LessonPreview lesson={lesson} />
    );
}