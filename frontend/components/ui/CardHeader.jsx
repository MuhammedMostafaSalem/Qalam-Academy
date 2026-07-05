import {
    HiOutlineEllipsisHorizontal,
    HiOutlineChevronDown,
} from "react-icons/hi2";

const CardHeader = ({
    title,
    subtitle,
    filter = false,
    filterLabel = "آخر 7 أيام",
    action,
}) => {
    return (
        <div
            className="
                mb-6

                flex
                items-start
                justify-between
                gap-4
            "
        >
            {/* Left */}
            <div>
                <h2
                    className="
                        text-lg
                        font-semibold
                        text-foreground
                    "
                >
                    {title}
                </h2>

                {subtitle && (
                    <p
                        className="
                            mt-1
                            text-sm
                            text-text-secondary
                        "
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {filter && (
                    <button
                        className="
                            flex
                            items-center
                            gap-2

                            rounded-xl

                            border
                            border-border

                            bg-background

                            px-3
                            py-2

                            text-sm

                            transition-all
                            duration-300

                            hover:border-primary
                        "
                    >
                        {filterLabel}

                        <HiOutlineChevronDown size={16} />
                    </button>
                )}

                {action ? (
                    action
                ) : (
                    <button
                        className="
                            flex
                            h-10
                            w-10

                            items-center
                            justify-center

                            rounded-xl

                            transition-all
                            duration-300

                            hover:bg-background-alt
                        "
                    >
                        <HiOutlineEllipsisHorizontal size={22} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardHeader;