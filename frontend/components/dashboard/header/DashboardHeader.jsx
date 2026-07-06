"use client";

import { useEffect, useRef, useState } from "react";
import {
    HiOutlineBars3,
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import Breadcrumb from "@/components/ui/Breadcrumb";

const DashboardHeader = ({
    setMobileOpen,
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleLogout = () => {
        console.log("logout");
        // logout logic
    };
    return (
        <header
            className="
                sticky
                top-0
                z-30
                bg-background
            "
        >
            <div
                className="
                    flex
                    h-20
                    items-center
                    justify-between
                    gap-6

                    px-3
                "
            >
                {/* Left */}
                <div className="flex items-center gap-4">
                    {/* Mobile Sidebar */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center

                            rounded-xl

                            border
                            border-border

                            transition-all
                            duration-300

                            hover:border-primary
                            hover:bg-card

                            lg:hidden
                        "
                    >
                        <HiOutlineBars3 size={24} />
                    </button>

                    {/* title page */}
                    <div
                        className="
                            relative
                        "
                    >
                        <Breadcrumb
                            items={[
                                {
                                    label: "الرئيسية",
                                    href: "/",
                                },
                                {
                                    label: "الكورسات",
                                    href: "/courses",
                                },
                                {
                                    label: "Frontend Development",
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="relative" ref={menuRef}>
                    {/* User */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="
                            flex
                            items-center
                            gap-3

                            px-3
                            py-2

                            transition-all
                            duration-300

                            hover:border-primary
                        "
                    >
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="User"
                            className="
                                h-11
                                w-11
                                rounded-full
                                object-cover
                            "
                        />

                        <div className="hidden md:block text-right">

                            <h3 className="font-semibold">
                                Marwan Salem
                            </h3>

                            <p
                                className="
                                    text-sm
                                    text-text-secondary
                                "
                            >
                                Administrator
                            </p>
                        </div>

                        <HiChevronDown
                            className={`
                                text-xl
                                transition-transform
                                duration-300
                                ${open ? "rotate-180" : "rotate-0"}
                            `}
                        />
                    </button>

                    <div
                    className={`
                            absolute
                            left-0
                            mt-2
                            w-52
                            glass
                            hover:shadow-neon
                            overflow-hidden
                            z-50

                            transition-all
                            duration-200
                            origin-top
                            ${open
                                ? "opacity-100 scale-100 translate-y-0"
                                : "pointer-events-none opacity-0 scale-95 -translate-y-2"
                            }
                        `}
                    >
                        <button
                            onClick={handleLogout}
                            className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    text-red-500
                                    transition
                                "
                        >
                            <FaSignOutAlt />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;