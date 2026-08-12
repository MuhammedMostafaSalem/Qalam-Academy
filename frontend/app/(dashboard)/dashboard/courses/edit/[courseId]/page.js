import UpdateCourseForm from "@/components/dashboard/course-management/UpdateCourseForm";
import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = {
    title: "تعديل الكورس",
};

export default async function EditCoursePage({ params }) {
    const { courseId } = await params;

    return (
        <div
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <PageHeader
                title="تعديل الكورس"
                description="قم بتعديل بيانات الكورس واضغط على حفظ التعديلات"
            />

            <div className="mt-[20px]">
                <UpdateCourseForm courseId={courseId} />
            </div>
        </div>
    );
}
