const HeroBackground = () => {
    return (
        <>
            {/* Main Gradient */}
            <div
                className="
                    absolute
                    inset-0
                    -z-20
                    bg-[radial-gradient(circle_at_top,#1D4ED833,transparent_60%)]
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
                    bg-primary/20
                    blur-[140px]
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
                "
            />

            {/* Grid Pattern */}
            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    opacity-[0.03]
                    [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)]
                    [background-size:60px_60px]
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
                "
            />
        </>
    )
}

export default HeroBackground