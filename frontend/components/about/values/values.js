import {
    HiOutlineSparkles,
    HiOutlineLightBulb,
    HiOutlineShieldCheck,
    HiOutlineUsers,
    HiOutlineBriefcase,
    HiOutlineChartBar,
} from "react-icons/hi2";

const values = [
    {
        id: 1,
        title: { ar: "الجودة", en: "Quality" },
        description: { ar: "نلتزم بتقديم أعلى معايير الجودة", en: "We are committed to delivering the highest quality standards." },
        icon: HiOutlineSparkles,
    },
    {
        id: 2,
        title: { ar: "الابتكار", en: "Innovation" },
        description: { ar: "نبتكر حلولًا ذكية لمشاكل معقدة", en: "We innovate smart solutions for complex challenges." },
        icon: HiOutlineLightBulb,
    },
    {
        id: 3,
        title: { ar: "الشفافية", en: "Transparency" },
        description: { ar: "نتواصل بوضوح ونلتزم بالصدق", en: "We communicate clearly and uphold honesty." },
        icon: HiOutlineShieldCheck,
    },
    {
        id: 4,
        title: { ar: "التركيز على العميل", en: "Customer Focus" },
        description: { ar: "نجاحك هو هدفنا الاول دائمًا.", en: "Your success is always our primary mission." },
        icon: HiOutlineUsers,
    },
    {
        id: 5,
        title: { ar: "المسؤولية", en: "Responsibility" },
        description: { ar: "نحافظ على بياناتك ونلتزم بالموعد", en: "We protect your data and stay committed to deadlines." },
        icon: HiOutlineBriefcase,
    },
    {
        id: 6,
        title: { ar: "التطوير المستمر", en: "Continuous Growth" },
        description: { ar: "نتعلم ونطور لنواكب مستقبل التقنية", en: "We continuously learn and evolve to lead tech futures." },
        icon: HiOutlineChartBar,
    },
];

export default values;