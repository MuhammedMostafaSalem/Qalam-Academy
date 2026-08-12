import { useRef, useEffect, useState } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";

const StatusDropdown = ({ isActive, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const statuses = [
        {
            value: true,
            label: "نشط",
            icon: BsCheckCircleFill,
            color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
        },
        {
            value: false,
            label: "معطل",
            icon: BsXCircleFill,
            color: "text-red-500 bg-red-500/10 border-red-500/20"
        },
    ];

    const currentItem = statuses.find((s) => s.value === isActive) || statuses[0];
    const CurrentIcon = currentItem.icon;

    const toggleMenu = () => {
        if (!open) {
            const triggerEl = menuRef.current?.firstElementChild;
            const rect = triggerEl?.getBoundingClientRect();

            setOpenUp(
                rect
                    ? rect.bottom + 160 > window.innerHeight
                    : false
            );
        }

        setOpen((prev) => !prev);
    };

    return (
        <div className="relative inline-block text-right" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className={`
                    flex
                    items-center
                    justify-between
                    gap-2
                    rounded-xl
                    border
                    px-3 py-1.5
                    text-sm
                    transition
                    cursor-pointer
                    w-[110px]
                    ${currentItem.color}
                `}
            >
                <div className="flex items-center gap-2">
                    <CurrentIcon className="text-sm" />
                    <span>{currentItem.label}</span>
                </div>
                <HiChevronDown className={`text-base transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute
                right-0
                rtl:right-0
                rtl:left-auto
                w-36
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-card
                shadow-xl
                transition-all
                duration-200
                origin-top
                z-20
                ${
                    openUp
                        ? "bottom-full mb-2 origin-bottom"
                        : "top-full mt-2"
                }
                ${
                    open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }
                    `}
            >
                {statuses.map((status) => {
                    const Icon = status.icon;
                    return (
                        <button
                            key={String(status.value)}
                            onClick={() => {
                                onSelect(status.value);
                                setOpen(false);
                            }}
                            className={`
                                flex
                                w-full
                                items-center
                                gap-3
                                px-4 py-3
                                text-sm
                                transition
                                hover:bg-primary/10
                                ${
                                    isActive === status.value ? "font-semibold bg-primary/5 text-primary" : "text-text-primary"
                                }
                            `}
                        >
                            <Icon className={`text-sm ${status.value ? "text-emerald-500" : "text-red-500"}`} />
                            <span>{status.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default StatusDropdown