"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { resolveAvatarUrl } from "@/constants/avatar";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const { language } = useLanguage();

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

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await logout();

        setOpen(false);

        router.replace("/");
    }

    if (!user) return null;

    const dashboardRoutes = {
        admin: "/dashboard",
        instructor: "/dashboard",
        student: "/user/profile",
    }

    const isDashboardUser = ["admin", "instructor"].includes(user.role);

    const firstMenuItem = {
        label: isDashboardUser
            ? (language === "en" ? "Dashboard" : "لوحة التحكم")
            : (language === "en" ? "Your Profile" : "ملفك الشخصي"),
        href: dashboardRoutes[user.role] || "/profile",
        icon: isDashboardUser ? MdDashboard : CgProfile,
    }

    const FirstIcon = firstMenuItem.icon;

    const avatarSrc = resolveAvatarUrl(user.avatar);
    const avatarAlt = user.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : (language === "en" ? "User" : "المستخدم");

    return (
        <div
            className="relative"
            ref={menuRef}
        >
            {/* User Button */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    items-center
                    gap-3
                    rounded-full
                    px-2
                    py-1
                    cursor-pointer
                    transition
                    hover:bg-card-hover
                "
            >
                <Image
                    src={avatarSrc}
                    alt={avatarAlt}
                    width={44}
                    height={44}
                    unoptimized
                    className="
                        h-11
                        w-11
                        rounded-full
                        object-cover
                    "
                />

                <HiChevronDown
                    className={`
                        text-xl
                        transition-transform
                        duration-300
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`
                    absolute
                    left-0 rtl:left-0 rtl:right-auto
                    mt-3
                    w-56
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    shadow-xl
                    transition-all
                    duration-200
                    origin-top

                    ${open
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                    }
                `}
            >
                <button
                    onClick={() => {
                        setOpen(false);
                        router.push(firstMenuItem.href);
                    }}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-5
                        py-4
                        transition
                        hover:bg-primary/10
                    "
                >
                    <FirstIcon className="text-lg" />

                    <span>
                        {firstMenuItem.label}
                    </span>
                </button>

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-5
                        py-4
                        text-error
                        transition
                        hover:bg-error/10
                    "
                >
                    <FaSignOutAlt
                        className="text-base"
                    />

                    <span>
                        {language === "en" ? "Log Out" : "تسجيل الخروج"}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
