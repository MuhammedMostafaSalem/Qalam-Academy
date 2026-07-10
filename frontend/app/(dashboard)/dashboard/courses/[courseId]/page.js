import CourseLayout from "@/components/layout/dashboard/courseDetails/CourseLayout";

export default async function CoursePage({ params }) {
    const { courseId } = await params;

    return (
        <CourseLayout courseId={courseId} />
    );
}