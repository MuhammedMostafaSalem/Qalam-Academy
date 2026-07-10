import ChartsSection from "@/components/dashboard/home/ChartsSection";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCards from "@/components/ui/StatsCards";
import dashboardStats from "@/constants/dashboardStats";

export default function Dashboard() {
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
                title="مرحبًا بعودتك، مروان سالم"
                description="إليك ملخص اداء موقعك تايوم."
            />
            <StatsCards stats={dashboardStats} />
            <ChartsSection />
        </div>
    )
}