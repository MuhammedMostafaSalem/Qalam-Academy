import {
    FaCode,
    FaMobileAlt,
    FaGraduationCap,
    FaShoppingCart,
    FaPaintBrush,
    FaBullhorn,
} from "react-icons/fa";
import { GrVmMaintenance } from "react-icons/gr";

const services = [
    {
        id: 1,
        title: "تطوير الويب",
        slug: "web-development",
        description:
            "أنشئ مواقع إلكترونية سريعة وآمنة وقابلة للتوسع باستخدام تقنيات حديثة مصممة خصيصاً لتلبية احتياجات عملك.",
        icon: FaCode,
    },
    {
        id: 2,
        title: "تطبيقات الموبايل",
        slug: "mobile-app-development",
        description:
            "أنشئ تطبيقات عالية الأداء لنظامي Android وiOS توفر تجارب مستخدم استثنائية.",
        icon: FaMobileAlt,
    },
    {
        id: 3,
        title: "كورسات البرمجة",
        slug: "programming-courses",
        description:
            "كورسات احترافية في البرمجة وتطوير الويب والتقنيات الحديثة، يقدمها خبراء.",
        icon: FaGraduationCap,
    },
    {
        id: 4,
        title: "الدعم والصيانة",
        slug: "support-maintenance",
        description:
            "دعم فني وصيانة دورية لضمان أستقرار وأداء أنظمتط",
        icon: GrVmMaintenance,
    },
    {
        id: 5,
        title: "تصميم UI / UX",
        slug: "ui-ux-design",
        description:
            "صمّم واجهات جذابة وبديهية تعزز تفاعل العملاء ورضاهم.",
        icon: FaPaintBrush,
    },
    {
        id: 6,
        title: "التسويق الرقمي",
        slug: "digital-marketing",
        description:
            "نمِّ عملك من خلال تحسين محركات البحث (SEO)، والتسويق عبر وسائل التواصل الاجتماعي، وحملات الإعلانات الموجهة.",
        icon: FaBullhorn,
    },
];

export default services;