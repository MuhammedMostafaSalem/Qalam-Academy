import { cardAnimation } from "@/lib/animation/cardAnimation";

const StatItem = ({ value, label, isLast, index }) => {
    
    return (
        <div
            {...cardAnimation(index)}
            className="
                relative
                flex
                flex-col
                items-center
                justify-center
                px-6
                text-center
                lg:items-end
                lg:text-right
            "
        >
            <div>
                <h3
                    className="
                        text-4xl
                        font-extrabold
                        text-primary
                    "
                >
                    {value}
                </h3>

                <p
                    className="
                        mt-2
                        text-sm
                        font-medium
                        text-text-secondary
                    "
                >
                    {label}
                </p>
            </div>
            {!isLast && (
                <div
                    className="
                        absolute
                        -left-3
                        top-1/2
                        h-1/2
                        w-px
                        -translate-y-1/2
                        bg-white/10
                    "
                />
            )}
        </div>
    );
};

export default StatItem;