const Input = ({
    label,
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}

            <input
                className={`
                    h-14
                    w-full
                    rounded-input
                    border
                    border-border
                    px-4
                    outline-none
                    transition
                    focus:border-primary
                    ${className}
                `}
                {...props}
            />

            {error && (
                <p className="text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input