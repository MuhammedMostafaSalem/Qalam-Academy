const BlogHeroBackground = () => {
    return (
        <>
            {/* Main Gradient */}
            <div
                className="
                    absolute
                    inset-0
                    -z-20
                    bg-[radial-gradient(circle_at_top,#2563EB10,#070B17_65%)]
                "
            />

            {/* Left Glow */}
            <div
                className="
                    absolute
                    top-24
                    left-0
                    -z-10
                    h-80
                    w-80
                    rounded-full
                    bg-primary/30
                    blur-[170px]
                "
            />

            {/* Right Glow */}
            <div
                className="
                    absolute
                    right-0
                    bottom-0
                    -z-10
                    h-96
                    w-96
                    rounded-full
                    bg-secondary/20
                    blur-[180px]
                "
            />

            {/* Grid */}
            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    opacity-[0.015]
                    [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)]
                    [background-size:60px_60px]
                    [mask-image:radial-gradient(circle_at_center,black_55%,transparent)]
                    [-webkit-mask-image:radial-gradient(circle_at_center,black_55%,transparent)]
                "
            />

            {/* Left Dots */}
            <div
                className="
                    absolute
                    left-16
                    top-52
                    -z-10
                    h-40
                    w-40
                    opacity-40
                    [background-image:radial-gradient(circle,#3B82F6_2px,transparent_2px)]
                    [background-size:18px_18px]
                "
            />

            {/* Right Dots */}
            <div
                className="
                    absolute
                    right-20
                    bottom-28
                    -z-10
                    h-44
                    w-44
                    opacity-30
                    [background-image:radial-gradient(circle,#8B5CF6_2px,transparent_2px)]
                    [background-size:20px_20px]
                "
            />

            {/* Floating Blur */}
            <div
                className="
                    animate-float
                    absolute
                    top-40
                    right-1/3
                    -z-10
                    h-24
                    w-24
                    rounded-full
                    bg-primary/20
                    blur-3xl
                "
            />
        </>
    );
};

export default BlogHeroBackground;