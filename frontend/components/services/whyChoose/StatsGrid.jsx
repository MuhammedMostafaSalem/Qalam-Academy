import { fadeUp } from "@/lib/animationHelpers"
import StatItem from "./StatItem"
import useUserStats from "@/hooks/users/useUserStats";
import usePortfolios from "@/hooks/portfolio/usePortfolios";

const StatsGrid = () => {
    const { stats: userStats, loading } = useUserStats();
    const { portfolios, error } = usePortfolios();

    const whyChooseStats = [
        {
            id: 1,
            value: `+${process.env.NEXT_PUBLIC_YEARS_OF_EXPERIENCE}`,
            label: { ar: "سنوات خبرة", en: "Years Experience" },
        },
        {
            id: 2,
            value: loading ? "..." : `+${userStats.students}`,
            label: { ar: "عميل سعيد", en: "Happy Clients" },
        },
        {
            id: 3,
            value: `+${portfolios.length}`,
            label: { ar: "مشروع مكتمل", en: "Completed Projects" },
        },
        {
            id: 4,
            value: loading ? "..." : `+${userStats.instructors}`,
            label: { ar: "خبير تقني", en: "Tech Experts" },
        },
    ];
    return (
        <div
            {...fadeUp()}
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
                    key={index}
                    index={index}
                    {...stat}
                    isLast={index === whyChooseStats.length - 1}
                />
            ))}
        </div>
    )
}

export default StatsGrid