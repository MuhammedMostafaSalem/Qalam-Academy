import StatItem from "./StatItem"
import whyChooseStats from "./whyChooseStats"

const StatsGrid = () => {
    return (
        <div
            className="
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-8
                py-8
            "
        >
            {whyChooseStats.map((stat, index) => (
                <StatItem
                    key={stat.id}
                    {...stat}
                    isLast={index === whyChooseStats.length - 1}
                />
            ))}
        </div>
    )
}

export default StatsGrid