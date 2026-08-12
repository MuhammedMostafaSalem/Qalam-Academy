import CreateCourseForm from "@/components/dashboard/course-management/CreateCourseForm";
import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = {
    title: "إنشاء كورس جديد",
};

export default function CreateCoursePage() {
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
                title="إنشاء كورس جديد"
                description="أدخل بيانات الكورس الجديد ثم اضغط على إنشاء الكورس"
            />

            <div className="mt-[20px]">
                <CreateCourseForm />
            </div>
        </div>
    );
}
