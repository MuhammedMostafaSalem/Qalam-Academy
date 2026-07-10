import LessonForm from "@/components/dashboard/course-management/lessons/LessonForm";

export default async function CreateLessonPage({
    params,
}) {
    const { courseId } = await params;

    return (
        <LessonForm
            mode="create"
            courseId={courseId}
        />
    );
}