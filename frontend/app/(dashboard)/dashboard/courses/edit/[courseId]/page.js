import UpdateCourseForm from "@/components/dashboard/course-management/UpdateCourseForm";
import PageHeader from "@/components/dashboard/PageHeader";
import { getCourseByIdAction } from "@/actions/courseActions";
import { notFound } from "next/navigation";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata({ params }) {
    const { courseId: courseReference } = await params;
    try {
        const result = await getCourseByIdAction(courseReference);
        const course = result?.success ? result.data : null;
        const title = course?.title
            ? {
                ar: `تعديل: ${typeof course.title === "object" ? (course.title.ar || course.title.en) : course.title}`,
                en: `Edit: ${typeof course.title === "object" ? (course.title.en || course.title.ar) : course.title}`
            }
            : { ar: "تعديل الكورس", en: "Edit Course" };

        return generateSEOMetadata({
            title,
            noIndex: true,
        });
    } catch {
        return generateSEOMetadata({
            title: { ar: "تعديل الكورس", en: "Edit Course" },
            noIndex: true,
        });
    }
}

export default async function EditCoursePage({ params }) {
    const { courseId: courseReference } = await params;
    const result = await getCourseByIdAction(courseReference);
    const course = result.success ? result.data : null;

    if (!course) notFound();

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
                <UpdateCourseForm courseId={course._id} />
            </div>
        </div>
    );
}
