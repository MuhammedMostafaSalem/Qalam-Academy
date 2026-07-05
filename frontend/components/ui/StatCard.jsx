import {
    HiArrowTrendingUp,
    HiArrowTrendingDown,
} from "react-icons/hi2";

const StatCard = ({
    title,
    value,
    change,
    positive,
    icon: Icon,
}) => {
    return (
        <div
            className="
                group

                rounded-3xl
                border
                border-border

                bg-card

                p-6

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/30
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-text-secondary">
                        {title}
                    </p>

                    <h3
                        className="
                            mt-3
                            text-4xl
                            font-bold
                        "
                    >
                        {value}
                    </h3>
                </div>

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-card

                        text-primary

                        transition-all
                        duration-300

                        group-hover:scale-110
                    "
                >
                    <Icon size={28} />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-text-secondary text-sm">
                    مقارنة بالشهر الماضي
                </span>

                <span
                    className={
                        positive
                            ? "text-green-500 font-medium"
                            : "text-red-500 font-medium"
                    }
                >
                    {change}
                </span>
                
                {positive ? (
                    <HiArrowTrendingUp
                        className="text-green-500"
                        size={20}
                    />
                ) : (
                    <HiArrowTrendingDown
                        className="text-red-500"
                        size={20}
                    />
                )}
            </div>
        </div>
    );
};

export default StatCard;