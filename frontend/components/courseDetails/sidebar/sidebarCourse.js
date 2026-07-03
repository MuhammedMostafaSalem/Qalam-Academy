import {
    HiOutlineClock,
    HiOutlineAcademicCap,
    HiOutlineLanguage,
    HiOutlineDevicePhoneMobile,
    HiOutlineDocumentDuplicate,
    HiOutlineTrophy,
} from "react-icons/hi2";

const sidebarCourse = {
    price: 1499,
    oldPrice: 2499,

    features: [
        {
            icon: HiOutlineClock,
            label: "المدة",
            value: "40 ساعة",
        },
        {
            icon: HiOutlineAcademicCap,
            label: "المستوى",
            value: "مبتدئ → متقدم",
        },
        {
            icon: HiOutlineDocumentDuplicate,
            label: "عدد الدروس",
            value: "48 درس",
        },
        {
            icon: HiOutlineLanguage,
            label: "اللغة",
            value: "العربية",
        },
        {
            icon: HiOutlineDevicePhoneMobile,
            label: "الوصول",
            value: "مدى الحياة",
        },
        {
            icon: HiOutlineTrophy,
            label: "الشهادة",
            value: "معتمدة",
        },
    ],
};

export default sidebarCourse;