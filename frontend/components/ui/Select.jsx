const Select = ({
    label,
    options = [],
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

            <select
                className={`
                    h-14
                    w-full
                    rounded-input
                    border
                    border-border
                    bg-white
                    px-4
                    outline-none
                    focus:border-primary
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select