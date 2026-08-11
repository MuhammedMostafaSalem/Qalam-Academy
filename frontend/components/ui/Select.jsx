"use client";

import { HiChevronDown } from "react-icons/hi"

const Select = ({ value, onChange, values = [] }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="
                    h-12
                    w-full
                    md:w-[170px]
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
                "
            >
                {
                    values.map((item, index) => (
                        <option key={index} value={item.value}>{item.name}</option>
                    ))
                }
            </select>

            <HiChevronDown
                className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-text-secondary
                "
            />
        </div>
    )
}

export default Select