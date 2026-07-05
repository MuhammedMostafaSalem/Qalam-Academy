import {
    HiOutlineCurrencyDollar,
    HiOutlineUsers,
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
} from "react-icons/hi2";

const dashboardStats = [
    {
        id: 1,
        title: "إجمالي الإيرادات",
        value: "$52,480",
        change: "+12.5%",
        positive: true,
        icon: HiOutlineCurrencyDollar,
    },
    {
        id: 2,
        title: "إجمالي الطلاب",
        value: "1,284",
        change: "+8.2%",
        positive: true,
        icon: HiOutlineUsers,
    },
    {
        id: 3,
        title: "الكورسات",
        value: "36",
        change: "+3",
        positive: true,
        icon: HiOutlineAcademicCap,
    },
    {
        id: 4,
        title: "الطلبات",
        value: "421",
        change: "-4.1%",
        positive: false,
        icon: HiOutlineShoppingBag,
    },
];

export default dashboardStats;