"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchInput = ({ inputPlaceholder, value, onChange = () => {} }) => {
    return (
        <div className="relative w-full">
            <HiOutlineMagnifyingGlass
                className="
                    absolute
                    rtl:right-4 rtl:left-auto
                    ltr:left-4 ltr:right-auto
                    top-1/2
                    -translate-y-1/2
                    text-text-secondary
                "
                size={20}
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={inputPlaceholder}
                className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-card
                    rtl:pr-12 rtl:pl-4
                    ltr:pl-12 ltr:pr-4
                    outline-none
                    transition
                    focus:border-primary
                "
            />
        </div>
    );
};

export default SearchInput;