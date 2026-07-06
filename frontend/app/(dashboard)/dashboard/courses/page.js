import CoursesTable from "@/components/dashboard/courses/CoursesTable";
import CoursesToolbar from "@/components/dashboard/courses/CoursesToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminCourses() {
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
                title="الكورسات"
                description="ادارة جميع كورسات المنصة"
                button="اضافة كورس جديد"
            />
            <CoursesToolbar />
            <CoursesTable />
        </div>
    )
}