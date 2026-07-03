const FeatureCard = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-7
                hover-lift
            "
        >
            <div
                className="
                    mb-6
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                "
            >
                <Icon size={28} />
            </div>

            <h3 className="text-xl font-bold">
                {title}
            </h3>

            <p className="mt-4 leading-8 text-text-secondary">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;