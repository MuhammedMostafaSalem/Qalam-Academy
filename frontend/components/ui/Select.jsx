"use client";

import { HiChevronDown } from "react-icons/hi";

const Select = ({ value, onChange, values = [], options, children, className = "" }) => {
    const items = options || values;

    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className={`
                    h-12
                    w-full
                    md:w-[180px]
                    appearance-none
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    px-5
                    text-text-primary
                    outline-none
                    transition-all
                    duration-300
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                    ${className}
                `}
            >
                {children ? children : items.map((item, index) => {
                    const optionValue = typeof item === "object" ? item.value : item;
                    const optionLabel = typeof item === "object" ? (item.label ?? item.name ?? item.value) : item;

                    return (
                        <option key={index} value={optionValue} className="bg-background-alt text-white">
                            {optionLabel}
                        </option>
                    );
                })}
            </select>

            <HiChevronDown
                className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-text-secondary
                "
            />
        </div>
    );
};

export default Select;