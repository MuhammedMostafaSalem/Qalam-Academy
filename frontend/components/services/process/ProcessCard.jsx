const ProcessCard = ({ step }) => {
    const Icon = step.icon;

    return (
        <article className="relative text-center">

            {/* Timeline Circle */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-white
                    shadow-lg
                "
            >
                <Icon className="h-9 w-9" />
            </div>

            {/* Card */}

            <div
                className="
                    mt-8
                    rounded-3xl
                    glass
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-primary/40
                    hover:shadow-xl
                    hover:shadow-primary/10
                "
            >
                <span
                    className="
                        text-sm
                        font-bold
                        tracking-widest
                        text-primary
                    "
                >
                    {step.number}
                </span>

                <h3
                    className="
                        mt-4
                        text-xl
                        font-bold
                        text-text-primary
                    "
                >
                    {step.title}
                </h3>

                <p
                    className="
                        mt-4
                        leading-7
                        text-text-secondary
                    "
                >
                    {step.description}
                </p>
            </div>

        </article>
    )
}

export default ProcessCard