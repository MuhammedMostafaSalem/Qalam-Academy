"use client";

import NavLinks from "./NavLinks"
import Logo from "./Logo"
import CTAButton from "./CTAButton"
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";
import { fadeDown } from "@/lib/animationHelpers";
import UserMenu from "@/components/shared/UserMenu";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = ({ isTop, openMenu, setOpenMenu }) => {
    const { user, loading } = useAuth();

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
                    <LanguageSwitcher />

                    {
                        loading ? (
                            <div className="w-10 h-10 rounded-full animate-pulse bg-white/10" />
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