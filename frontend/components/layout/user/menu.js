import {
    HiOutlineHome,
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
    HiOutlineDocumentCheck,
    HiOutlineHeart,
    HiOutlineArrowDownTray,
    HiOutlineCreditCard,
    HiOutlineUserCircle,
} from "react-icons/hi2";

export const menu = [
    {
        section: { ar: "الرئيسية", en: "Overview" },
        items: [
            {
                title: { ar: "لوحة التحكم", en: "Dashboard" },
                href: "/user",
                icon: HiOutlineHome,
            },
        ],
    },

    {
        section: { ar: "التعلم", en: "Learning" },
        items: [
            {
                title: { ar: "كورساتي", en: "My Courses" },
                href: "/user/my-courses",
                icon: HiOutlineAcademicCap,
            },
            {
                title: { ar: "الشهادات", en: "Certificates" },
                href: "/user/certificates",
                icon: HiOutlineDocumentCheck,
            },
            {
                title: { ar: "المفضلة", en: "Wishlist" },
                href: "/user/wishlist",
                icon: HiOutlineHeart,
            },
            {
                title: { ar: "التنزيلات", en: "Downloads" },
                href: "/user/downloads",
                icon: HiOutlineArrowDownTray,
            },
        ],
    },

    {
        section: { ar: "المشتريات", en: "Purchases" },
        items: [
            {
                title: { ar: "طلباتي", en: "My Orders" },
                href: "/user/orders",
                icon: HiOutlineShoppingBag,
            },
            {
                title: { ar: "سجل المدفوعات", en: "Payment History" },
                href: "/user/payment-history",
                icon: HiOutlineCreditCard,
            },
        ],
    },

    // {
    //     section: { ar: "الحساب", en: "Account" },
    //     items: [
    //         {
    //             title: { ar: "الملف الشخصي", en: "Profile" },
    //             href: "/user/profile",
    //             icon: HiOutlineUserCircle,
    //         },
    //     ],
    // },
];
