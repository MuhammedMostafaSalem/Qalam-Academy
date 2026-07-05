const CustomTooltip = ({
    active,
    payload,
    label,
    prefix = "$",
    suffix = "",
}) => {
    if (!active || !payload?.length) return null;

    return (
        <div
            className="
                rounded-2xl

                border
                border-border

                bg-card/95
                backdrop-blur-xl

                px-4
                py-3

                shadow-xl
            "
        >
            <p
                className="
                    mb-2
                    text-xs
                    text-text-secondary
                "
            >
                {label}
            </p>

            <h3
                className="
                    text-lg
                    font-bold
                "
            >
                {prefix}
                {Number(payload[0].value).toLocaleString()}
                {suffix}
            </h3>
        </div>
    );
};

export default CustomTooltip;