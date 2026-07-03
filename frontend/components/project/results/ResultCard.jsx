const ResultCard = ({
    value,
    label,
    description,
}) => {
    return (
        <div
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-8
                text-center
                hover-lift
            "
        >
            <h3
                className="
                    text-5xl
                    font-bold
                    gradient-text
                "
            >
                {value}
            </h3>

            <h4
                className="
                    mt-5
                    text-xl
                    font-semibold
                "
            >
                {label}
            </h4>

            <p
                className="
                    mt-4
                    leading-7
                    text-text-secondary
                "
            >
                {description}
            </p>
        </div>
    );
};

export default ResultCard;