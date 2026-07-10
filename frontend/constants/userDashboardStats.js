import {
    HiOutlineAcademicCap,
    HiOutlineCheckBadge,
    HiOutlineClock,
    HiOutlineDocumentCheck,
} from "react-icons/hi2";

const userDahsboardStats = [
    {
        id: 1,
        title: "الكورسات المشتركة",
        value: "12",
        description: "كورس",
        icon: HiOutlineAcademicCap,
        color: "bg-primary/10 text-primary",
    },
    {
        id: 2,
        title: "الكورسات المكتملة",
        value: "5",
        description: "كورس مكتمل",
        icon: HiOutlineCheckBadge,
        color: "bg-green-500/10 text-green-500",
    },
    {
        id: 3,
        title: "ساعات التعلم",
        value: "48",
        description: "ساعة",
        icon: HiOutlineClock,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        id: 4,
        title: "الشهادات",
        value: "3",
        description: "شهادة",
        icon: HiOutlineDocumentCheck,
        color: "bg-yellow-500/10 text-yellow-500",
    },
];

export default userDahsboardStats;