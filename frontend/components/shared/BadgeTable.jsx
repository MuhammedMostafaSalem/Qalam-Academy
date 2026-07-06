const BadgeTable = ({ data, className }) => {
    return (
        <span
            className={`
                inline-flex
                items-center
                font-medium
                ${className}
            `}
        >
            {data}
        </span>
    )
}

export default BadgeTable