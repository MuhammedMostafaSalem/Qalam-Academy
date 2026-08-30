"use client";

import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { LiaDiscourse } from "react-icons/lia";
import { AiOutlineProduct } from "react-icons/ai";
import { RiProjectorLine } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";

const TypeDropdown = ({ currentType, onSelect }) => {
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

    const types = [
        { value: "course", label: "Course", icon: LiaDiscourse },
        { value: "portfolio", label: "Portfolio", icon: RiProjectorLine },
        { value: "service", label: "Service", icon: MdOutlineHomeRepairService },
        { value: "product", label: "Product", icon: AiOutlineProduct },
        { value: "blog", label: "Blog", icon: RiBloggerLine },
    ]

    const currentItem = types.find((r) => r.value === currentType) || types[0];
    const CurrentIcon = currentItem.icon;

    return (
        <div className="relative inline-block text-right" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm text-text-primary transition hover:border-primary cursor-pointer w-[130px]"
            >
                <div className="flex items-center gap-2">
                    {/* <CurrentIcon className="text-primary text-base" /> */}
                    <span>{currentType}</span>
                </div>
                <HiChevronDown
                    className={`
                        text-base
                        transition-transform
                        duration-300
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`
                    absolute
                    right-0
                    rtl:right-0
                    rtl:left-auto
                    w-40
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
                    ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                    }
                `}
            >
                {
                    types.map((type) => {
                        const Icon = type.icon;
                        return (
                            <button
                                key={type.value}
                                onClick={() => {
                                    onSelect(type.value);
                                    setOpen(false);
                                }}
                                className={`flex z-50 w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-primary/10 ${currentType === type.value ? "text-primary font-semibold bg-primary/5" : "text-text-primary"
                                    }`}
                            >
                                <Icon className="text-base" />
                                <span>{type.label}</span>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TypeDropdown