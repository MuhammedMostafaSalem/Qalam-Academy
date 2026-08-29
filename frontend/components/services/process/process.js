import {
    HiOutlineMagnifyingGlass,
    HiOutlineClipboardDocumentCheck,
    HiOutlineCodeBracketSquare,
    HiOutlineRocketLaunch,
} from "react-icons/hi2";

const process = [
    {
        id: 1,
        number: "01",
        icon: HiOutlineMagnifyingGlass,
        title: { ar: "تحليل المتطلبات", en: "Requirements Analysis" },
        description: {
            ar: "نفهم احتياجاتك وأهداف مشروعك ونحدد أفضل الحلول التقنية المناسبة.",
            en: "We analyze your needs and project goals to identify optimal technical solutions.",
        },
    },
    {
        id: 2,
        number: "02",
        icon: HiOutlineClipboardDocumentCheck,
        title: { ar: "التخطيط والتصميم", en: "Planning & Design" },
        description: {
            ar: "نضع خطة تنفيذ واضحة ونصمم تجربة مستخدم وواجهة احترافية قبل بدء التطوير.",
            en: "We establish a clear execution roadmap and craft intuitive UI/UX designs before development.",
        },
    },
    {
        id: 3,
        number: "03",
        icon: HiOutlineCodeBracketSquare,
        title: { ar: "التطوير والتنفيذ", en: "Development & Execution" },
        description: {
            ar: "يقوم فريقنا ببناء المشروع باستخدام أحدث التقنيات مع متابعة مستمرة للتقدم.",
            en: "Our engineering team builds your project with cutting-edge tech while keeping you updated.",
        },
    },
    {
        id: 4,
        number: "04",
        icon: HiOutlineRocketLaunch,
        title: { ar: "الإطلاق والدعم", en: "Launch & Support" },
        description: {
            ar: "نختبر المشروع بدقة ثم نطلقه ونوفر الدعم والصيانة لضمان استمرارية النجاح.",
            en: "We rigorously test and deploy your product, providing ongoing support to guarantee sustained success.",
        },
    },
];

export default process;