import PageHeader from "@/components/dashboard/PageHeader";
import CoursesToolbar from "@/components/user/dashboard/courses/CoursesToolbar";
import MyCoursesGrid from "@/components/user/dashboard/courses/MyCoursesGrid";

export default function MyCoursesPage() {
    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title="كورساتي"
                description="جميع الكورسات التي اشتركت بها وتستطيع متابعة تقدمك فيها"
            />

            <CoursesToolbar />

            <MyCoursesGrid />
        </div>
    );
}