"use client";

import { NAVIGATION } from '@/constants/navigation';
import { usePathname } from 'next/navigation';
import Link from "next/link";

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <ul className="hidden items-center gap-8 lg:flex">
            {NAVIGATION.map((item) => (
                <li key={item.id}>
                    <Link
                        href={item.href}
                        className={`font-medium transition-colors duration-300 ${pathname === item.href
                            ? "text-primary"
                            : "text-text-secondary hover:text-primary"
                        }`}
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavLinks