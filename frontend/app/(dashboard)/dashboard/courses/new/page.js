import CreateCourseForm from "@/components/dashboard/course-management/CreateCourseForm";
import PageHeader from "@/components/dashboard/PageHeader";

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/courses/new",
        title: {
            ar: "إضافة كورس جديد",
            en: "Create New Course",
        },
        noIndex: true,
    });
}

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
