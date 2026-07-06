"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({
    href,
    title,
    icon: Icon,
    collapsed,
}) => {
    const pathname = usePathname();

    const active = pathname === href

    return (
        <Link
            href={href}
            className={`
                group

                mx-3
                mb-2

                flex
                items-center

                rounded-2xl

                px-2

                transition-all
                duration-300
                ease-in-out

                ${active
                    ? "bg-primary text-white shadow-lg"
                    : "hover:bg-background-alt"
                }

                ${collapsed
                    ? "justify-center"
                    : "gap-4"
                }
            `}
        >
            <div
                className="
                    flex
                    h-11
                    w-11

                    shrink-0

                    items-center
                    justify-center

                    rounded-xl

                    transition-all
                    duration-300
                    ease-in-out

                    group-hover:scale-110
                "
            >
                <Icon size={22} />
            </div>

            <span
                className={`
                    overflow-hidden
                    whitespace-nowrap

                    transition-all
                    duration-300
                    ease-in-out

                    ${collapsed
                        ? "w-0 opacity-0"
                        : "opacity-100"
                    }
                `}
            >
                {title}
            </span>
        </Link>
    );
};

export default SidebarItem;