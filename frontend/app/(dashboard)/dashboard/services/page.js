import PageHeader from "@/components/dashboard/PageHeader";
import ServicesTable from "@/components/dashboard/services/ServicesTable";
import ServicesToolbar from "@/components/dashboard/services/ServicesToolbar";

export default function AdminServices() {
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
                title="جميع الخدمات"
                description="ادارة وعرض جميع الخدمات المضافة"
                button="اضافة خدمة جديدة"
            />
            <ServicesToolbar />
            <ServicesTable />
        </div>
    )
}