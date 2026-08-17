import LessonLayout from "@/components/lesson/LessonLayout";
import { getLessonByIdAction, getCourseDetailsAction } from "@/actions/lessonActions";
import { getCourseProgressAction } from "@/actions/progressActions";
import { notFound } from "next/navigation";

export default async function LessonPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const lessonId = resolvedParams?.lessonId;

    if (!lessonId) {
        notFound();
    }

    // Fetch lesson data and course details concurrently
    const [lessonResult, courseDetailsResult] = await Promise.all([
        getLessonByIdAction(lessonId),
        slug ? getCourseDetailsAction(slug) : Promise.resolve({ success: false, data: null }),
    ]);

    if (!lessonResult.success || !lessonResult.data) {
        notFound();
    }

    const lesson = lessonResult.data;
    const courseDetails = courseDetailsResult?.success ? courseDetailsResult.data : null;

    // Fetch course progress (includes all lessons and completion status)
    const courseId = lesson.course?._id || lesson.course || courseDetails?.course?._id;
    const progressResult = courseId ? await getCourseProgressAction(courseId) : null;
    const courseProgress = progressResult?.success ? progressResult.data : null;

    // Prioritize lessons from course details or progress
    const courseLessons = courseDetails?.lessons?.length
        ? courseDetails.lessons
        : courseProgress?.lessons?.length
            ? courseProgress.lessons
            : [];

    return (
        <LessonLayout
            lesson={lesson}
            courseSlug={slug}
            courseProgress={courseProgress}
            courseLessons={courseLessons}
        />
    );
}