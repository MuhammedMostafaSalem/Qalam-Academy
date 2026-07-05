import {
    HiOutlineHome,
    HiOutlineBriefcase,
    HiOutlineFolder,
    HiOutlineUsers,
    HiOutlineAcademicCap,
    HiOutlineSquares2X2,
    HiOutlineUserGroup,
    HiOutlineClipboardDocumentList,
    HiOutlineShoppingBag,
    HiOutlineShoppingCart,
    HiOutlineTicket,
    HiOutlineDocumentText,
    HiOutlineEnvelope,
    HiOutlineCog6Tooth,
} from "react-icons/hi2";
import SidebarItem from "./SidebarItem";

const menu = [
    {
        title: "لوحة التحكم",
        href: "/dashboard",
        icon: HiOutlineHome,
    },
    {
        title: "الخدمات",
        href: "/dashboard/services",
        icon: HiOutlineBriefcase,
    },
    {
        title: "المشاريع",
        href: "/dashboard/portfolio",
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
        title: "الكورسات",
        href: "/dashboard/courses",
        icon: HiOutlineAcademicCap,
    },
    {
        title: "التصنيفات",
        href: "/dashboard/categories",
        icon: HiOutlineSquares2X2,
    },
    {
        title: "الطلاب",
        href: "/dashboard/students",
        icon: HiOutlineUsers,
    },
    {
        title: "الاشتركات",
        href: "/dashboard/enrollments",
        icon: HiOutlineClipboardDocumentList,
    },
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
    {
        title: "المقالات",
        href: "/dashboard/blog",
        icon: HiOutlineDocumentText,
    },
    {
        title: "الاعدادات",
        href: "/dashboard/settings",
        icon: HiOutlineCog6Tooth,
    },
];

const SidebarMenu = ({ collapsed }) => {
    return (
        <nav className="space-y-1">
            {menu.map((item) => (
                <SidebarItem
                    key={item.href}
                    {...item}
                    collapsed={collapsed}
                />
            ))}
        </nav>
    );
};

export default SidebarMenu;