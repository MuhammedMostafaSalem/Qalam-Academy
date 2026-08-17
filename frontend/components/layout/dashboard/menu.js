import {
    HiOutlineAcademicCap,
    HiOutlineBriefcase,
    HiOutlineClipboardDocumentList,
    HiOutlineCog6Tooth,
    HiOutlineDocumentText,
    HiOutlineFolder,
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineShoppingCart,
    HiOutlineTicket,
    HiOutlineUserGroup,
    HiOutlineUsers,
    HiOutlineEnvelope,
} from "react-icons/hi2";

import { PiUsersThreeLight } from "react-icons/pi";

const menu = [
    {
        section: "الرئيسية",
        roles: ["admin", "instructor"],
        items: [
            {
                title: "لوحة التحكم",
                href: "/dashboard",
                icon: HiOutlineHome,
                roles: ["admin", "instructor"],
            },
        ],
    },

    {
        section: "إدارة المستخدمين",
        roles: ["admin"],
        items: [
            {
                title: "المستخدمين",
                href: "/dashboard/users",
                icon: PiUsersThreeLight,
                roles: ["admin"],
            },
        ],
    },

    {
        section: "التعليم",
        roles: ["admin", "instructor"],
        items: [
            {
                title: "الكورسات",
                href: "/dashboard/courses",
                icon: HiOutlineAcademicCap,
                roles: ["admin", "instructor"],
            },
            {
                title: "التصنيفات",
                href: "/dashboard/categories",
                icon: HiOutlineFolder,
                roles: ["admin"],
            },
            {
                title: "الاشتراكات",
                href: "/dashboard/enrollments",
                icon: HiOutlineClipboardDocumentList,
                roles: ["admin"],
            },
        ],
    },

    {
        section: "المتجر",
        roles: ["admin", "instructor"],
        items: [
            {
                title: "المنتجات",
                href: "/dashboard/products",
                icon: HiOutlineShoppingBag,
                roles: ["admin"],
            },
            {
                title: "الطلبات",
                href: "/dashboard/orders",
                icon: HiOutlineShoppingCart,
                roles: ["admin", "instructor"],
            },
            {
                title: "الكوبونات",
                href: "/dashboard/coupons",
                icon: HiOutlineTicket,
                roles: ["admin", "instructor"],
            },
        ],
    },

    {
        section: "المحتوى",
        roles: ["admin"],
        items: [
            {
                title: "الخدمات",
                href: "/dashboard/services",
                icon: HiOutlineBriefcase,
                roles: ["admin"],
            },
            {
                title: "المشاريع",
                href: "/dashboard/projects",
                icon: HiOutlineFolder,
                roles: ["admin"],
            },
            {
                title: "الفريق",
                href: "/dashboard/team",
                icon: HiOutlineUsers,
                roles: ["admin"],
            },
            {
                title: "الشركاء",
                href: "/dashboard/partners",
                icon: HiOutlineUserGroup,
                roles: ["admin"],
            },
            {
                title: "المقالات",
                href: "/dashboard/blog",
                icon: HiOutlineDocumentText,
                roles: ["admin"],
            },
        ],
    },

    {
        section: "التواصل",
        roles: ["admin"],
        items: [
            {
                title: "الرسائل",
                href: "/dashboard/messages",
                icon: HiOutlineEnvelope,
                roles: ["admin"],
            },
        ],
    },

    {
        section: "النظام",
        roles: ["admin"],
        items: [
            {
                title: "الإعدادات",
                href: "/dashboard/settings",
                icon: HiOutlineCog6Tooth,
                roles: ["admin"],
            },
        ],
    },
];

export default menu;