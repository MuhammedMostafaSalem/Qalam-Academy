const ServicesHeroBackground = () => {
    return (
        // <>
        //     {/* Center Glow */}
        //     <div
        //         className="
        //             absolute
        //             left-1/2
        //             top-10
        //             -translate-x-1/2
        //             -z-20
        //             h-[320px]
        //             w-[320px]
        //             rounded-full
        //             bg-primary/12
        //             blur-[120px]
        //             animate-pulse-glow
        //         "
        //     />

        //     {/* Left Glow */}
        //     <div
        //         className="
        //             absolute
        //             left-0
        //             top-1/3
        //             -translate-x-1/2
        //             -z-20
        //             h-60
        //             w-60
        //             rounded-full
        //             bg-primary/8
        //             blur-[110px]
        //             animate-pulse-glow
        //         "
        //     />

        //     {/* Right Glow */}
        //     <div
        //         className="
        //             absolute
        //             right-0
        //             bottom-12
        //             translate-x-1/2
        //             -z-20
        //             h-64
        //             w-64
        //             rounded-full
        //             bg-secondary/8
        //             blur-[110px]
        //             animate-pulse-glow
        //         "
        //     />

        //     {/* Top Left Pattern */}
        //     <div
        //         className="
        //             absolute
        //             left-12
        //             top-16
        //             -z-10
        //             h-36
        //             w-36
        //             opacity-30
        //             bg-[radial-gradient(circle,_rgba(59,130,246,.35)_1.2px,_transparent_1.2px)]
        //             [background-size:18px_18px]
        //             animate-float
        //         "
        //     />

        //     {/* Bottom Right Pattern */}
        //     <div
        //         className="
        //             absolute
        //             right-12
        //             bottom-12
        //             -z-10
        //             h-40
        //             w-40
        //             opacity-25
        //             bg-[radial-gradient(circle,_rgba(139,92,246,.35)_1.2px,_transparent_1.2px)]
        //             [background-size:18px_18px]
        //             animate-float
        //         "
        //     />

        //     {/* Grid */}
        //     <div
        //         className="
        //             absolute
        //             inset-0
        //             -z-30
        //             opacity-[0.04]
        //             bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
        //             [background-size:64px_64px]
        //         "
        //     />
        // </>
        <>
            {/* Top Glow */}

            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    -z-10
                    h-[500px]
                    w-[500px]
                    -translate-x-1/2
                    rounded-full
                    bg-primary/10
                    blur-[120px]
                    animate-pulse-glow
                "
            />

            {/* Left Glow */}

            <div
                className="
                    absolute
                    -left-40
                    top-40
                    -z-10
                    h-80
                    w-80
                    rounded-full
                    bg-secondary/10
                    blur-[120px]
                    animate-pulse-glow
                "
            />

            {/* Right Glow */}

            <div
                className="
                    absolute
                    -right-32
                    bottom-20
                    -z-10
                    h-72
                    w-72
                    rounded-full
                    bg-primary/10
                    blur-[120px]
                    animate-pulse-glow
                "
            />

            {/* Top Left Dots */}

            <div
                className="
                    absolute
                    left-16
                    top-0
                    -z-10
                    h-40
                    w-40
                    bg-[radial-gradient(circle,_rgba(59,130,246,0.45)_1.5px,_transparent_1.5px)]
                    [background-size:18px_18px]
                    opacity-40
                    animate-float
                "
            />

            {/* Bottom Right Dots */}

            <div
                className="
                    absolute
                    bottom-0
                    right-10
                    -z-10
                    h-48
                    w-48
                    bg-[radial-gradient(circle,_rgba(139,92,246,0.45)_1.5px,_transparent_1.5px)]
                    [background-size:18px_18px]
                    opacity-40
                    animate-float
                "
            />

            {/* Grid Overlay */}

            <div
                className="
                    absolute
                    inset-0
                    -z-20
                    bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
                    [background-size:60px_60px]
                    opacity-40
                "
            />
        </>
    );
};

export default ServicesHeroBackground;