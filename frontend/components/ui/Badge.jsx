const Badge = ({
    children,
}) => {
    return (
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-primary">
            {children}
        </span>
    )
}

export default Badge