import {
    HiOutlineAcademicCap,
    HiOutlineBriefcase,
    HiOutlineChartBar,
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
        items: [
            {
                title: "لوحة التحكم",
                href: "/dashboard",
                icon: HiOutlineHome,
            },
        ],
    },

    {
        section: "إدارة المستخدمين",
        items: [
            {
                title: "المستخدمين",
                href: "/dashboard/users",
                icon: PiUsersThreeLight,
            },
        ],
    },

    {
        section: "التعليم",
        items: [
            {
                title: "الكورسات",
                href: "/dashboard/courses",
                icon: HiOutlineAcademicCap,
            },
            {
                title: "التصنيفات",
                href: "/dashboard/categories",
                icon: HiOutlineFolder,
            },
            {
                title: "الاشتراكات",
                href: "/dashboard/enrollments",
                icon: HiOutlineClipboardDocumentList,
            },
        ],
    },

    {
        section: "المتجر",
        items: [
            {
                title: "المنتجات",
                href: "/dashboard/products",
                icon: HiOutlineShoppingBag,
            },
            {
                title: "الطلبات",
                href: "/dashboard/orders",
                icon: HiOutlineShoppingCart,
            },
            {
                title: "الكوبونات",
                href: "/dashboard/coupons",
                icon: HiOutlineTicket,
            },
        ],
    },

    {
        section: "المحتوى",
        items: [
            {
                title: "الخدمات",
                href: "/dashboard/services",
                icon: HiOutlineBriefcase,
            },
            {
                title: "المشاريع",
                href: "/dashboard/projects",
                icon: HiOutlineFolder,
            },
            {
                title: "الفريق",
                href: "/dashboard/team",
                icon: HiOutlineUsers,
            },
            {
                title: "الشركاء",
                href: "/dashboard/partners",
                icon: HiOutlineUserGroup,
            },
            {
                title: "المقالات",
                href: "/dashboard/blog",
                icon: HiOutlineDocumentText,
            },
        ],
    },

    {
        section: "التواصل",
        items: [
            {
                title: "الرسائل",
                href: "/dashboard/messages",
                icon: HiOutlineEnvelope,
            },
        ],
    },

    {
        section: "النظام",
        items: [
            {
                title: "التحليلات",
                href: "/dashboard/analytics",
                icon: HiOutlineChartBar,
            },
            {
                title: "الإعدادات",
                href: "/dashboard/settings",
                icon: HiOutlineCog6Tooth,
            },
        ],
    },
];

export default menu;