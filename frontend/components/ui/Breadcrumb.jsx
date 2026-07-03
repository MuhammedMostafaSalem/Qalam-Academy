import { fadeDown } from "@/lib/animationHelpers";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav
            {...fadeDown()}
            aria-label="Breadcrumb"
            className="flex justify-start"
        >
            <ol
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    text-sm
                    text-text-secondary
                "
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={item.label}
                            className="flex items-center gap-2"
                        >
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="
                                        transition-colors
                                        duration-300
                                        text-primary
                                    "
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className="
                                        font-medium
                                        text-text-primary
                                    "
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <HiChevronLeft
                                    className="
                                        h-4
                                        w-4
                                        text-text-muted
                                    "
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;