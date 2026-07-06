import {
    HiOutlineGlobeAlt,
    HiOutlineDevicePhoneMobile,
    HiOutlineShoppingCart,
    HiOutlinePaintBrush,
    HiOutlineChartBar,
    HiOutlineShieldCheck,
} from "react-icons/hi2";

export const services = [
    {
        id: 1,

        title: "تطوير المواقع",

        description:
            "تصميم وتطوير مواقع ويب احترافية متجاوبة مع جميع الأجهزة.",

        category: "تطوير الويب",

        status: "active",

        order: 1,

        createdAt: "10 مايو 2024",

        icon: HiOutlineGlobeAlt,

        color: "blue",
    },

    {
        id: 2,

        title: "تطبيقات الجوال",

        description:
            "تطوير تطبيقات Android و iOS عالية الأداء.",

        category: "تطوير التطبيقات",

        status: "active",

        order: 2,

        createdAt: "9 مايو 2024",

        icon: HiOutlineDevicePhoneMobile,

        color: "green",
    },

    {
        id: 3,

        title: "التجارة الإلكترونية",

        description:
            "إنشاء متاجر إلكترونية متكاملة وسريعة.",

        category: "التجارة الإلكترونية",

        status: "active",

        order: 3,

        createdAt: "8 مايو 2024",

        icon: HiOutlineShoppingCart,

        color: "orange",
    },

    {
        id: 4,

        title: "تصميم UI/UX",

        description:
            "تصميم واجهات مستخدم حديثة وتجربة استخدام مميزة.",

        category: "التصميم",

        status: "active",

        order: 4,

        createdAt: "7 مايو 2024",

        icon: HiOutlinePaintBrush,

        color: "purple",
    },

    {
        id: 5,

        title: "تحسين محركات البحث",

        description:
            "رفع ترتيب موقعك في نتائج البحث.",

        category: "التسويق الرقمي",

        status: "draft",

        order: 5,

        createdAt: "6 مايو 2024",

        icon: HiOutlineChartBar,

        color: "cyan",
    },

    {
        id: 6,

        title: "أمن وحماية المواقع",

        description:
            "حماية المواقع من الاختراقات وتأمين البيانات.",

        category: "الأمان",

        status: "inactive",

        order: 6,

        createdAt: "5 مايو 2024",

        icon: HiOutlineShieldCheck,

        color: "red",
    },
];

export const rowServices = [
    "الخدمة",
    "التصنيف",
    "الحالة",
    "الترتيب",
    "تاريخ الانشاء",
    "الاجراءات",
]