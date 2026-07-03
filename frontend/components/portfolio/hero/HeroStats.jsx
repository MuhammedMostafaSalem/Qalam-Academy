import { cardAnimation } from "@/lib/animation/cardAnimation";
import { animations } from "@/lib/animations";

const stats = [
    {
        value: "350+",
        label: "مشروع مكتمل",
    },
    {
        value: "250+",
        label: "عميل سعيد",
    },
    {
        value: "7+",
        label: "سنوات خبرة",
    },
    {
        value: "98%",
        label: "رضا العملاء",
    },
];

const HeroStats = () => {
    return (
        <div
            className="
                mt-16
                grid
                w-full
                max-w-4xl
                grid-cols-2
                gap-6

                md:grid-cols-4
            "
        >
            {stats.map((item, index) => (
                <div
                    key={index}
                    {...cardAnimation(index)}
                    className={`
                        rounded-3xl
                        border
                        border-border
                        bg-card/60
                        p-6
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:border-primary
                        ${animations.hoverLift}
                    `}
                >
                    <h3
                        className="
                            text-4xl
                            font-bold
                            text-primary
                        "
                    >
                        {item.value}
                    </h3>

                    <p
                        className="
                            mt-3
                            text-sm
                            text-text-secondary
                        "
                    >
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default HeroStats;