"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronLeft } from "react-icons/hi2";

const Breadcrumb = () => {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const items = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return {
            label: decodeURIComponent(segment),
            href,
        };
    });
    // <nav
    //     aria-label="Breadcrumb"
    //     className="flex justify-start"
    // >
    //     <ol
    //         className="
    //             flex
    //             flex-wrap
    //             items-center
    //             gap-2
    //             text-sm
    //             text-text-secondary
    //         "
    //     >
    //         {items.map((item, index) => {
    //             const isLast = index === items.length - 1;

    //             return (
    //                 <li
    //                     key={item.label}
    //                     className="flex items-center gap-2"
    //                 >
    //                     {item.href && !isLast ? (
    //                         <Link
    //                             href={item.href}
    //                             className="
    //                                 transition-colors
    //                                 duration-300
    //                                 text-primary
    //                             "
    //                         >
    //                             {item.label}
    //                         </Link>
    //                     ) : (
    //                         <span
    //                             className="
    //                                 font-medium
    //                                 text-text-primary
    //                             "
    //                             aria-current="page"
    //                         >
    //                             {item.label}
    //                         </span>
    //                     )}

    //                     {!isLast && (
    //                         <HiChevronLeft
    //                             className="
    //                                 h-4
    //                                 w-4
    //                                 text-text-muted
    //                             "
    //                         />
    //                     )}
    //                 </li>
    //             );
    //         })}
    //     </ol>
    // </nav>
    return (
        <nav aria-label="Breadcrumb" className="flex justify-start">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.href} className="flex items-center gap-2">
                            {isLast ? (
                                <span
                                    className="font-medium text-text-primary"
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href} className="text-primary">
                                    {item.label}
                                </Link>
                            )}

                            {!isLast && (
                                <HiChevronLeft className="h-4 w-4 text-text-muted" />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;