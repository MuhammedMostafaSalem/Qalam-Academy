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
    HiOutlineMap,
} from "react-icons/hi2";

import { PiUsersThreeLight } from "react-icons/pi";

const menu = [
    {
        section: { ar: "الرئيسية", en: "Overview" },
        roles: ["admin", "instructor"],
        items: [
            {
                title: { ar: "لوحة التحكم", en: "Dashboard" },
                href: "/dashboard",
                icon: HiOutlineHome,
                roles: ["admin", "instructor"],
            },
        ],
    },

    {
        section: { ar: "إدارة المستخدمين", en: "User Management" },
        roles: ["admin"],
        items: [
            {
                title: { ar: "المستخدمون", en: "Users" },
                href: "/dashboard/users",
                icon: PiUsersThreeLight,
                roles: ["admin"],
            },
        ],
    },

    {
        section: { ar: "التعليم", en: "Learning" },
        roles: ["admin", "instructor"],
        items: [
            {
                title: { ar: "الدورات", en: "Courses" },
                href: "/dashboard/courses",
                icon: HiOutlineAcademicCap,
                roles: ["admin", "instructor"],
            },
            {
                title: { ar: "التصنيفات", en: "Categories" },
                href: "/dashboard/categories",
                icon: HiOutlineFolder,
                roles: ["admin"],
            },
            {
                title: { ar: "الاشتراكات", en: "Enrollments" },
                href: "/dashboard/enrollments",
                icon: HiOutlineClipboardDocumentList,
                roles: ["admin"],
            },
        ],
    },

    {
        section: { ar: "المتجر", en: "Store" },
        roles: ["admin", "instructor"],
        items: [
            {
                title: { ar: "المنتجات", en: "Products" },
                href: "/dashboard/products",
                icon: HiOutlineShoppingBag,
                roles: ["admin"],
            },
            {
                title: { ar: "الطلبات", en: "Orders" },
                href: "/dashboard/orders",
                icon: HiOutlineShoppingCart,
                roles: ["admin", "instructor"],
            },
            {
                title: { ar: "قسائم الخصم", en: "Coupons" },
                href: "/dashboard/coupons",
                icon: HiOutlineTicket,
                roles: ["admin", "instructor"],
            },
        ],
    },

    {
        section: { ar: "المحتوى", en: "Content" },
        roles: ["admin"],
        items: [
            {
                title: { ar: "الخدمات", en: "Services" },
                href: "/dashboard/services",
                icon: HiOutlineBriefcase,
                roles: ["admin"],
            },
            {
                title: { ar: "المشاريع", en: "Projects" },
                href: "/dashboard/projects",
                icon: HiOutlineFolder,
                roles: ["admin"],
            },
            {
                title: { ar: "الفريق", en: "Team" },
                href: "/dashboard/team",
                icon: HiOutlineUsers,
                roles: ["admin"],
            },
            {
                title: { ar: "الشركاء", en: "Partners" },
                href: "/dashboard/partners",
                icon: HiOutlineUserGroup,
                roles: ["admin"],
            },
            {
                title: { ar: "المقالات", en: "Blog Posts" },
                href: "/dashboard/blog",
                icon: HiOutlineDocumentText,
                roles: ["admin"],
            },
            {
                title: { ar: "رحلتنا", en: "Our Journey" },
                href: "/dashboard/journey",
                icon: HiOutlineMap,
                roles: ["admin"],
            },
        ],
    },

    {
        section: { ar: "التواصل", en: "Communication" },
        roles: ["admin"],
        items: [
            {
                title: { ar: "الرسائل", en: "Messages" },
                href: "/dashboard/messages",
                icon: HiOutlineEnvelope,
                roles: ["admin"],
            },
        ],
    },

    {
        section: { ar: "النظام", en: "System" },
        roles: ["admin"],
        items: [
            {
                title: { ar: "الإعدادات", en: "Settings" },
                href: "/dashboard/settings",
                icon: HiOutlineCog6Tooth,
                roles: ["admin"],
            },
        ],
    },
];

export default menu;
