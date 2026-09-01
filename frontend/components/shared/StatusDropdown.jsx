"use client";

import { createPortal } from "react-dom";
import { useCallback, useRef, useEffect, useState } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";
import { useLanguage } from "@/providers/LanguageProvider";

const StatusDropdown = ({ isActive, onSelect, activeLabel, inactiveLabel, disabled = false }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const [menuPosition, setMenuPosition] = useState(null);
    const menuRef = useRef(null);
    const menuPortalRef = useRef(null);

    const updateMenuPosition = useCallback(() => {
        const triggerEl = menuRef.current?.firstElementChild;
        if (!triggerEl) return;

        const rect = triggerEl.getBoundingClientRect();
        const menuWidth = 144;
        const menuHeight = 160;
        const viewportPadding = 8;
        const shouldOpenUp = rect.bottom + menuHeight + viewportPadding > window.innerHeight;
        const left = Math.min(
            Math.max(viewportPadding, rect.right - menuWidth),
            window.innerWidth - menuWidth - viewportPadding
        );

        setOpenUp(shouldOpenUp);
        setMenuPosition({
            left,
            top: shouldOpenUp
                ? Math.max(viewportPadding, rect.top - menuHeight - viewportPadding)
                : rect.bottom + viewportPadding,
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedTrigger = menuRef.current?.contains(event.target);
            const clickedMenu = menuPortalRef.current?.contains(event.target);

            if (!clickedTrigger && !clickedMenu) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!open) return;

        updateMenuPosition();

        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);

        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [open, updateMenuPosition]);

    const statuses = [
        {
            value: true,
            label: activeLabel || (isEn ? "Active" : "نشط"),
            icon: BsCheckCircleFill,
            color: "text-success bg-success/10 border-success/20"
        },
        {
            value: false,
            label: inactiveLabel || (isEn ? "Inactive" : "معطل"),
            icon: BsXCircleFill,
            color: "text-error bg-error/10 border-error/20"
        },
    ];

    const currentItem = statuses.find((s) => s.value === isActive) || statuses[0];
    const CurrentIcon = currentItem.icon;

    const toggleMenu = () => {
        if (open) {
            setOpen(false);
            return;
        }

        updateMenuPosition();
        setOpen(true);
    };

    return (
        <div className="relative inline-block text-right" ref={menuRef}>
            <button
                type="button"
                onClick={toggleMenu}
                disabled={disabled}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-50
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
            {open && menuPosition && typeof document !== "undefined"
                ? createPortal(
                    <div
                        ref={menuPortalRef}
                        style={{ left: menuPosition.left, top: menuPosition.top, width: 144 }}
                        className={`fixed
                            overflow-hidden
                            rounded-2xl
                            border
                            border-border
                            bg-card
                            shadow-xl
                            transition-all
                            duration-200
                            origin-top
                            z-[100]
                            ${openUp ? "origin-bottom" : "origin-top"}
                            translate-y-0 scale-100 opacity-100
                        `}
                    >
                        {statuses.map((status) => {
                            const Icon = status.icon;
                            return (
                                <button
                                    key={String(status.value)}
                                    type="button"
                                    disabled={disabled}
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
                                    <Icon className={`text-sm ${status.value ? "text-success" : "text-error"}`} />
                                    <span>{status.label}</span>
                                </button>
                            );
                        })}
                    </div>,
                    document.body
                )
                : null}
        </div>
    )
}

export default StatusDropdown
