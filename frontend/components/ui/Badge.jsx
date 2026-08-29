const Badge = ({
    children,
}) => {
    return (
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {children}
        </span>
    )
}

export default Badge
