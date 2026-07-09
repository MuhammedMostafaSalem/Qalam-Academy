import PageHeader from "@/components/dashboard/PageHeader";
import PortfolioTable from "@/components/dashboard/portfolio/PortfolioTable";
import PortfolioToolbar from "@/components/dashboard/portfolio/PortfolioToolbar";

export default function AdminProjects() {
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
                title="مشاريع الاعمال"
                description="ادارة وعرض جميع مشاريع الاعمال في الموقع"
                button="اضافة مشروع جديد"
            />
            <PortfolioToolbar />
            <PortfolioTable />
        </div>
    )
}