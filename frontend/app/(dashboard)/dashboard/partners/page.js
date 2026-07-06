import PageHeader from "@/components/dashboard/PageHeader";
import PartnersTable from "@/components/dashboard/partners/PartnersTable";
import PartnersToolbar from "@/components/dashboard/partners/PartnersToolbar";

export default function AdminPartners() {
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
                title="الشركاء"
                description="ادارة جميع الشركاء"
                button="اضافة شريك جديد"
            />
            <PartnersToolbar />
            <PartnersTable />
        </div>
    )
}