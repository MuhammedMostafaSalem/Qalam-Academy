import {
    HiOutlineHome,
    HiOutlineAcademicCap,
    HiOutlinePlayCircle,
    HiOutlineShoppingBag,
    HiOutlineDocumentCheck,
    HiOutlineHeart,
    HiOutlineArrowDownTray,
    HiOutlineCreditCard,
    HiOutlineUser,
} from "react-icons/hi2";

export const menu = [
    {
        section: "الرئيسية",
        items: [
            {
                title: "لوحة التحكم",
                href: "/user",
                icon: HiOutlineHome,
            },
        ],
    },

    {
        section: "التعلم",
        items: [
            {
                title: "كورساتي",
                href: "/user/my-courses",
                icon: HiOutlineAcademicCap,
            },
            {
                title: "مشغل الكورس",
                href: "/user/course-player",
                icon: HiOutlinePlayCircle,
            },
            {
                title: "الشهادات",
                href: "/user/certificates",
                icon: HiOutlineDocumentCheck,
            },
            {
                title: "المفضلة",
                href: "/user/wishlist",
                icon: HiOutlineHeart,
            },
            {
                title: "التنزيلات",
                href: "/user/downloads",
                icon: HiOutlineArrowDownTray,
            },
        ],
    },

    {
        section: "المشتريات",
        items: [
            {
                title: "طلباتي",
                href: "/user/orders",
                icon: HiOutlineShoppingBag,
            },
            {
                title: "سجل المدفوعات",
                href: "/user/payment-history",
                icon: HiOutlineCreditCard,
            },
        ],
    },

    {
        section: "الحساب",
        items: [
            {
                title: "الملف الشخصي",
                href: "/user/profile",
                icon: HiOutlineUser,
            },
        ],
    },
];