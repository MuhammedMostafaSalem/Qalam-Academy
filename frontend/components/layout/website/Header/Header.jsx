"use client";

import { useState } from "react";
import Navbar from "./Navbar"
import useScrollNavbar from "@/hooks/useScrollNavbar";
import { animations } from "@/lib/animations"

const Header = () => {
    const { showNavbar, isTop } = useScrollNavbar();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <header
            className={`
                fixed
                top-0
                left-0
                w-full
                z-50

                ${animations.transition}
                ${showNavbar ? "translate-y-0" : "-translate-y-full"}
                ${isTop ? "py-6" : "py-3"}
            `}
        >
            <Navbar
                isTop={isTop}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
            />
        </header>
    )
}

export default Header