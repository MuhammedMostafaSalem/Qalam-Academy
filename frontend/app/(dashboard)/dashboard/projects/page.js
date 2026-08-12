import PortfolioHeader from "@/components/dashboard/portfolio/PortfolioHeader";
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
            <PortfolioHeader />
            <PortfolioToolbar />
            <PortfolioTable />
        </div>
    )
}