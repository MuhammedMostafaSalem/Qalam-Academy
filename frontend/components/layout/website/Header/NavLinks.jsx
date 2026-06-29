"use client";

import { navigation } from '@/constants/navigation';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import MobileMenu from './MobileMenu';

const NavLinks = ({ isTop, open, onClose, menuRef }) => {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop */}
            <ul
                className={`hidden
                lg:flex
                items-center
                gap-8
                ${!isTop ? "glass rounded-full" : ""}
                px-6 py-2`}
            >

                {navigation.map((link) => (

                    <li key={link.href}>

                        <Link
                            href={link.href}
                            className={`transition duration-300 hover:text-primary ${pathname === link.href
                                ? "text-primary"
                                : "text-text-secondary"
                                }`}
                        >
                            {link.title}
                        </Link>

                    </li>

                ))}

            </ul>

            {/* Mobile */}
            <MobileMenu open={open} onClose={onClose} />
        </>
    )
}

export default NavLinks