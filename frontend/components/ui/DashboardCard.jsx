const DashboardCard = ({
    children,
    className = "",
    padding = true,
}) => {
    return (
        <div
            className={`
                relative

                overflow-hidden

                rounded-3xl

                border
                border-border

                bg-card/95
                backdrop-blur-xl

                shadow-[0_10px_40px_rgba(0,0,0,0.18)]

                transition-all
                duration-300
                ease-in-out

                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]

                ${padding ? "p-6" : ""
                }

                ${className}
            `}
        >
            {/* Decorative Glow */}
            <div
                className="
                    pointer-events-none

                    absolute
                    -top-24
                    -right-24

                    h-48
                    w-48

                    rounded-full

                    bg-primary/5

                    blur-3xl
                "
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default DashboardCard;