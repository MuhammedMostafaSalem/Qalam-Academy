"use client";

import { HiOutlineArrowDownTray } from "react-icons/hi2";

const ExportButton = ({
    onClick,
    children = "تصدير",
    className = "",
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-border
                bg-card
                px-5
                font-medium
                transition-all
                duration-300
                hover:border-primary
                hover:text-primary
                ${className}
            `}
            {...props}
        >
            <HiOutlineArrowDownTray size={20} />

            <span>{children}</span>
        </button>
    );
};

export default ExportButton;