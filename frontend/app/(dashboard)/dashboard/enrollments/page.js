import EnrollmentsTable from "@/components/dashboard/enrollments/EnrollmentsTable";
import EnrollmentsToolbar from "@/components/dashboard/enrollments/EnrollmentsToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminEnrollments() {
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
                title="الاشتراكات"
                description="ادارة جميع الاشتراكات"
            />
            <EnrollmentsToolbar />
            <EnrollmentsTable />
        </div>
    )
}