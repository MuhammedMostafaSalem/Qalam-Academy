"use client";

import { navigation } from "@/constants/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CTAButton from "./CTAButton";

const MobileMenu = ({ open, onClose }) => {
    const pathname = usePathname();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                open &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [open, onClose]);

    return (
        <div
            ref={menuRef}
            className={`
                absolute
                left-1/2
                top-full
                w-full
                max-w-4xl
                -translate-x-1/2
                rounded-card
                glass
                transition-all
                duration-300
                lg:hidden

                ${open
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-6 scale-95 pointer-events-none"
                }
            `}
        >
            <ul className="p-6 space-y-5">
                {navigation.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            onClick={onClose}
                            className={`block text-center text-lg transition ${pathname === item.href
                                ? "text-primary"
                                : "text-text-secondary hover:text-primary"
                                }`}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <hr className="border-text-secondary" />
            <div className="flex justify-center text-center mx-5 my-3">
                <CTAButton />
            </div>
        </div>
    );
}

export default MobileMenu