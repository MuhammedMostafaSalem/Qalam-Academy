import { cardAnimation } from "@/lib/animation/cardAnimation";

const MetaItem = ({
    index,
    item,
}) => {
    const Icon = item.icon;

    return (
        <div
            {...cardAnimation(index)}
            className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-border
                bg-card
                p-5
            "
        >
            <div
                className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                "
            >
                <Icon size={28} />
            </div>

            <div>

                <h3 className="text-xl font-bold">
                    {item.title}
                </h3>

                <p className="text-sm text-text-secondary">
                    {item.subtitle}
                </p>

            </div>
        </div>
    );
}

export default MetaItem