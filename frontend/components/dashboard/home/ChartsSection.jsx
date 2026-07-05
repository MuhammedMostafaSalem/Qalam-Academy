import Section from "@/components/sections/Section";
import RevenueChart from "../charts/RevenueChart";
import SalesChart from "../charts/SalesChart";
import RecentOrders from "../widgets/RecentOrders";
import StudentsDistributionChart from "../charts/StudentsDistributionChart";

const ChartsSection = () => {
    return (
        <Section
            className="
                mt-[20px]
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
            "
        >
            {/* Revenue */}
            <RevenueChart />

            {/* Sales */}
            <SalesChart />

            {/* Students Distribution */}
            <StudentsDistributionChart />
            
            {/* Recent Orders */}
            <RecentOrders />
        </Section>
    );
};

export default ChartsSection;