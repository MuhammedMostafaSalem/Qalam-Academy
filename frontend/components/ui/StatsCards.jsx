import dashboardStats from "@/constants/dashboardStats";
import Section from "../sections/Section";
import StatCard from "./StatCard";

const StatsCards = () => {
    return (
        <Section
            className="
                mt-[20px]

                grid
                gap-6

                sm:grid-cols-2
                xl:grid-cols-4
            "
        >
            {dashboardStats.map((stat,index ) => (
                <StatCard
                    key={stat.id}
                    {...stat}
                />
            ))}
        </Section>
    );
};

export default StatsCards;