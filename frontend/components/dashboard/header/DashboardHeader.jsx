"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
    HiOutlineBars3,
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useRouter } from "next/navigation";
import userIcon from '@/public/assets/user-icon.png';
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import LanguageSwitcher from "@/components/layout/website/Header/LanguageSwitcher";
import ThemeToggle from "@/components/shared/ThemeToggle";

const DashboardHeader = ({
    setMobileOpen,
}) => {
    const { user, logout } = useAuth();
    const { language } = useLanguage();
    const isEnglish = language === "en";
    const router = useRouter();
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

    const handleAccount = () => {
        setOpen(false);
        router.push(user?.role === "student" ? "/user/profile" : "/dashboard/profile");
    };

    const handleLogout = async () => {
        await logout();

        setOpen(false);

        router.replace("/");
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
                        aria-label={isEnglish ? "Open navigation menu" : "فتح قائمة التنقل"}
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
                        <Breadcrumb />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />

                    <ThemeToggle compact />

                    <div className="relative" ref={menuRef}>
                    {/* User */}
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={isEnglish ? "Open account menu" : "فتح قائمة الحساب"}
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
                            src={
                                user.avatar ? user.avatar : userIcon
                            }
                            alt={user.firstName || "User"}
                            width={44}
                            height={44}
                            className="
                                h-11
                                w-11
                                rounded-full
                                object-cover
                            "
                        />

                        <div className="hidden md:block text-right">
                            <h3 className="font-semibold">
                                {user.firstName} {user.lastName}
                            </h3>
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
                            onClick={handleAccount}
                            className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    text-primary
                                    transition
                                "
                        >
                            <MdAccountCircle />
                            <span>{isEnglish ? "Your Profile" : "حسابك الشخصي"}</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    text-error
                                    transition
                                "
                        >
                            <FaSignOutAlt />
                            <span>{isEnglish ? "Log Out" : "تسجيل الخروج"}</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
