import { cardAnimation } from "@/lib/animation/cardAnimation";

const FeatureCard = ({ feature, index }) => {
    const Icon = feature.icon;

    return (
        <article
            {...cardAnimation(index)}
            className="
                group
                p-8
                flex
                gap-3
            "
        >
            {/* Icon */}

            <div
                className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                "
            >
                <Icon
                    className="
                        h-10
                        w-10
                        text-primary
                    "
                />
            </div>

            <div>
                {/* Title */}

                <h3
                    className="
                    mb-3
                    text-xl
                    font-bold
                    text-foreground
                    text-primary
                "
                >
                    {feature.title}
                </h3>

                {/* Description */}

                <p
                    className="
                    text-sm
                    leading-7
                    text-muted-foreground
                "
                >
                    {feature.description}
                </p>
            </div>
        </article>
    );
}

export default FeatureCard