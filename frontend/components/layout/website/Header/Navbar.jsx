"use client";

import Link from "next/link";
import NavLinks from "./NavLinks"
import Logo from "./Logo"
import CTAButton from "./CTAButton"
import { HiOutlineMenuAlt3, HiX, HiOutlineShoppingBag } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";
import { fadeDown } from "@/lib/animationHelpers";
import UserMenu from "@/components/shared/UserMenu";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import ThemeToggle from "@/components/shared/ThemeToggle";

const Navbar = ({ isTop, openMenu, setOpenMenu }) => {
    const { user, loading } = useAuth();
    const { language } = useLanguage();

    return (
        <nav
            {...fadeDown()}
            className="container
            transition-all
            duration-300"
        >
            <div
                className={`
                    flex
                    items-center
                    justify-between

                    ${isTop
                        ? "h-20"
                        : "h-16"
                    }

                    transition-all
                    duration-300
                `}
            >

                <Logo />

                <NavLinks
                    isTop={isTop}
                    open={openMenu}
                    onClose={() => setOpenMenu(false)}
                    isAuthenticated={user}
                />

                <div className="flex items-center gap-3">
                    <Link
                        href="/cart"
                        className="flex h-11 w-11 items-center justify-center rounded-full glass text-text-primary hover:text-primary transition"
                        title={language === "en" ? "Shopping Cart" : "سلة الشراء"}
                        aria-label={language === "en" ? "Shopping Cart" : "سلة الشراء"}
                    >
                        <HiOutlineShoppingBag size={22} />
                    </Link>

                    <LanguageSwitcher />

                    <ThemeToggle compact />

                    {
                        loading ? (
                            <div className="w-10 h-10 rounded-full animate-pulse bg-card-hover" />
                        ) : user ? (
                            <UserMenu />
                        ) : (
                            <div className="hidden lg:block">
                                <CTAButton />
                            </div>
                        )
                    }

                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="lg:hidden flex h-12 w-12 items-center justify-center rounded-full glass"
                    >
                        {openMenu ? (
                            <HiX size={24} />
                        ) : (
                            <HiOutlineMenuAlt3 size={24} />
                        )}
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
