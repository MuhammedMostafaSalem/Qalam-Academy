const Card = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`
                rounded-card
                border
                border-border
                bg-card
                p-6
                shadow-card
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                ${className}
            `}
        >
            {children}
        </div>
    )
}

export default Card