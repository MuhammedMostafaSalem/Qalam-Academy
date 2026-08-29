"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronLeft } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const segmentLabels = {
    dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
    users: { ar: "المستخدمون", en: "Users" },
    courses: { ar: "الدورات", en: "Courses" },
    categories: { ar: "التصنيفات", en: "Categories" },
    enrollments: { ar: "الاشتراكات", en: "Enrollments" },
    products: { ar: "المنتجات", en: "Products" },
    orders: { ar: "الطلبات", en: "Orders" },
    coupons: { ar: "قسائم الخصم", en: "Coupons" },
    services: { ar: "الخدمات", en: "Services" },
    projects: { ar: "المشاريع", en: "Projects" },
    team: { ar: "الفريق", en: "Team" },
    partners: { ar: "الشركاء", en: "Partners" },
    blog: { ar: "المقالات", en: "Blog Posts" },
    messages: { ar: "الرسائل", en: "Messages" },
    settings: { ar: "الإعدادات", en: "Settings" },
    profile: { ar: "الملف الشخصي", en: "Profile" },
    new: { ar: "جديد", en: "New" },
    edit: { ar: "تعديل", en: "Edit" },
};

const Breadcrumb = () => {
    const pathname = usePathname();
    const { localize, isRtl } = useLanguage();

    const segments = pathname.split("/").filter(Boolean);

    const items = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return {
            label: segmentLabels[segment]
                ? localize(segmentLabels[segment])
                : decodeURIComponent(segment),
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
                                <HiChevronLeft className={`h-4 w-4 text-text-muted ${isRtl ? "" : "rotate-180"}`} />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
