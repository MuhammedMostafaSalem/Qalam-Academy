import { cardAnimation } from "@/lib/animation/cardAnimation";

const ValueCard = ({ value, index }) => {
    const Icon = value.icon;

    return (
        <article
        {...cardAnimation(index)}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-border
                glass
                p-4
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary/40
                hover:shadow-xl
                hover:shadow-primary/10
                flex
                flex-col
                items-center
                text-center
                gap-1
            "
        >
            {/* Icon */}

            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    transition-transform
                    duration-300
                    group-hover:scale-110
                "
            >
                <Icon className="h-8 w-8" />
            </div>

            {/* Content */}

            <h3
                className="
                    text-lg
                    font-bold
                    text-text-primary
                "
            >
                {value.title}
            </h3>

            <p
                className="
                    leading-5
                    text-text-secondary
                    text-sm
                "
            >
                {value.description}
            </p>
        </article>
    )
}

export default ValueCard