const PortfolioHeroBackground = () => {
    return (
        // <>
        //     {/* Main Gradient */}
        //     <div
        //         className="
        //             absolute
        //             inset-0
        //             -z-30
        //             bg-[radial-gradient(circle_at_top,#2563EB10,#070B17_65%)]
        //         "
        //     />

        //     {/* Left Glow */}

        //     <div
        //         className="
        //             absolute
        //             top-20
        //             left-0
        //             h-80
        //             w-80
        //             rounded-full
        //             bg-primary/20
        //             blur-[140px]
        //             -z-20
        //             animate-pulse-glow
        //         "
        //     />

        //     {/* Right Glow */}

        //     <div
        //         className="
        //             absolute
        //             bottom-0
        //             right-0
        //             h-80
        //             w-80
        //             rounded-full
        //             bg-secondary/20
        //             blur-[160px]
        //             -z-20
        //             animate-pulse-glow
        //         "
        //     />

        //     {/* Grid */}

        //     <div
        //         className="
        //             absolute
        //             inset-0
        //             -z-10
        //             opacity-[0.03]
        //             [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)]
        //             [background-size:60px_60px]
        //         "
        //     />
        // </>
        <>
            {/* Main Gradient */}
            <div
                className="
                    absolute
                    inset-0
                    -z-20
                    bg-[radial-gradient(circle_at_top,#1D4ED805,#070B17_60%)]
                "
            />

            {/* Left Glow */}
            <div
                className="
                    absolute
                    top-20
                    left-0
                    -z-10
                    h-72
                    w-72
                    rounded-full
                    bg-primary/80
                    blur-[140px]
                    animate-pulse-glow
                "
            />

            {/* Right Glow */}
            <div
                className="
                    absolute
                    right-0
                    bottom-10
                    -z-10
                    h-80
                    w-80
                    rounded-full
                    bg-secondary/20
                    blur-[160px]
                    animate-pulse-glow
                "
            />

            {/* Grid Pattern */}
            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    opacity-[0.008]
                    [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)]
                    [background-size:60px_60px]
                    [mask-image:radial-gradient(circle_at_center,black_55%,transparent)]
                    [-webkit-mask-image:radial-gradient(circle_at_center,black_55%,transparent)]
                "
            />

            {/* Dots Left */}
            <div
                className="
                    absolute
                    left-10
                    top-44
                    -z-10
                    h-40
                    w-40
                    opacity-40
                    [background-image:radial-gradient(circle,#3B82F6_2px,transparent_2px)]
                    [background-size:18px_18px]
                    animate-float
                "
            />

            {/* Dots Right */}
            <div
                className="
                    absolute
                    right-10
                    bottom-24
                    -z-10
                    h-44
                    w-44
                    opacity-30
                    [background-image:radial-gradient(circle,#8B5CF6_2px,transparent_2px)]
                    [background-size:20px_20px]
                    animate-float
                "
            />
        </>
    );
};

export default PortfolioHeroBackground;