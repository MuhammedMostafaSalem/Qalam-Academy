"use client";

import { navigation } from '@/constants/navigation';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import MobileMenu from './MobileMenu';
import { fadeDown } from '@/lib/animationHelpers';
import { useLanguage } from '@/providers/LanguageProvider';

const NavLinks = ({ isTop, open, onClose, isAuthenticated }) => {
    const pathname = usePathname();
    const { localize } = useLanguage();

    return (
        <>
            {/* Desktop */}
            <ul
                className={`hidden
                lg:flex
                items-center
                gap-5 xl:gap-7
                ${!isTop ? "glass rounded-full" : ""}
                px-6 py-2`}
            >

                {navigation.map((link, index) => (

                    <li
                        key={index}
                        {...fadeDown(index * 70)}
                    >

                        <Link
                            href={link.href}
                            className={`
                                transition
                                duration-300
                                hover:text-primary
                                ${pathname === link.href
                                    ? "text-primary"
                                    : "text-text-secondary"
                                }
                            `}
                        >
                            {localize(link.title)}
                        </Link>

                    </li>

                ))}

            </ul>

            {/* Mobile */}
            <MobileMenu open={open} onClose={onClose} isAuthenticated={isAuthenticated} />
        </>
    )
}

export default NavLinks