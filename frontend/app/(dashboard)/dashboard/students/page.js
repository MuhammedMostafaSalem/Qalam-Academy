import PageHeader from "@/components/dashboard/PageHeader";
import StudentsTable from "@/components/dashboard/students/StudentsTable";
import StudentsToolbar from "@/components/dashboard/students/StudentsToolbar";

export default function AdminStudents() {
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
                title="الطلاب"
                description="ادارة جميع الطلاب المسجلين في المنصة"
            />
            <StudentsToolbar />
            <StudentsTable />
        </div>
    )
}