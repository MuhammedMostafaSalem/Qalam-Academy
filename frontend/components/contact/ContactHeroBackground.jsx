const ContactHeroBackground = () => {
    return (
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
                "
            />

            {/* Top Left Dots */}

            <div
                className="
                    absolute
                    left-16
                    top-20
                    -z-10
                    h-40
                    w-40
                    bg-[radial-gradient(circle,_rgba(59,130,246,0.45)_1.5px,_transparent_1.5px)]
                    [background-size:18px_18px]
                    opacity-40
                "
            />

            {/* Bottom Right Dots */}

            <div
                className="
                    absolute
                    bottom-24
                    right-10
                    -z-10
                    h-48
                    w-48
                    bg-[radial-gradient(circle,_rgba(139,92,246,0.45)_1.5px,_transparent_1.5px)]
                    [background-size:18px_18px]
                    opacity-40
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

export default ContactHeroBackground;