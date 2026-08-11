import LessonLayout from "@/components/lesson/LessonLayout";
import { getLessonByIdAction } from "@/actions/lessonActions";
import { getCourseProgressAction } from "@/actions/progressActions";
import { notFound } from "next/navigation";

export default async function LessonPage({ params }) {
    const { slug, lessonId } = params;
    
    // Fetch lesson data
    const lessonResult = await getLessonByIdAction(lessonId);
    
    if (!lessonResult.success || !lessonResult.data) {
        notFound();
    }

    const lesson = lessonResult.data;
    
    // Fetch course progress (includes all lessons and completion status)
    const progressResult = await getCourseProgressAction(lesson.course._id || lesson.course);
    const courseProgress = progressResult.success ? progressResult.data : null;

    return (
        <LessonLayout 
            lesson={lesson}
            courseSlug={slug}
            courseProgress={courseProgress}
        />
    );
}