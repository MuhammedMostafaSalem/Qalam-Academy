"use client";

import {
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
    HiOutlineXMark,
} from "react-icons/hi2";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";

const Sidebar = ({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
}) => {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setMobileOpen(false)}
                className={`
                    fixed
                    inset-0
                    z-40
                    bg-black/60
                    backdrop-blur-sm
                    transition-all
                    duration-300

                    lg:hidden

                    ${mobileOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }
                `}
            />

            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-50

                    h-screen

                    bg-card
                    border-l
                    border-border

                    transition-all
                    duration-300
                    ease-in-out

                    lg:sticky

                    ${collapsed
                        ? "lg:w-24"
                        : "lg:w-72"
                    }

                    ${mobileOpen
                        ? "translate-x-0"
                        : "translate-x-full lg:translate-x-0"
                    }

                    w-72
                `}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div
                        className="
                            flex
                            h-20
                            items-center
                            justify-between
                            border-b
                            border-border
                            px-5
                        "
                    >
                        <SidebarLogo collapsed={collapsed} />

                        {/* Desktop */}
                        <button
                            onClick={() =>
                                setCollapsed(!collapsed)
                            }
                            className="
                                hidden
                                lg:flex

                                h-10
                                w-10

                                items-center
                                justify-center

                                rounded-xl

                                hover:bg-background-alt

                                transition-all
                                duration-300
                            "
                        >
                            {collapsed ? (
                                <HiOutlineChevronDoubleRight size={20} />
                            ) : (
                                <HiOutlineChevronDoubleLeft size={20} />
                            )}
                        </button>

                        {/* Mobile */}
                        <button
                            onClick={() =>
                                setMobileOpen(false)
                            }
                            className="
                                flex
                                lg:hidden

                                h-10
                                w-10

                                items-center
                                justify-center

                                rounded-xl

                                hover:bg-background-alt
                            "
                        >
                            <HiOutlineXMark size={24} />
                        </button>

                    </div>

                    {/* Menu */}
                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            py-6

                            [scrollbar-width:none]
                            [-ms-overflow-style:none]
                            scrollbar-none
                        "
                    >
                        <SidebarMenu
                            collapsed={collapsed}
                        />
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;