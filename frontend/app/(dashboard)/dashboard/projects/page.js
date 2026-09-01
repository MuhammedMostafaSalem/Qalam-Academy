import PortfolioHeader from "@/components/dashboard/portfolio/PortfolioHeader";
import PortfolioTable from "@/components/dashboard/portfolio/PortfolioTable";
import PortfolioToolbar from "@/components/dashboard/portfolio/PortfolioToolbar";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/projects",
        title: {
            ar: "إدارة مشاريع المعرض",
            en: "Manage Projects",
        },
        noIndex: true,
    });
}

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
            <PortfolioHeader />
            <PortfolioToolbar />
            <PortfolioTable />
        </div>
    )
}