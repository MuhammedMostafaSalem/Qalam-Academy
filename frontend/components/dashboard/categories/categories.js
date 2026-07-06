import WebImage from "@/public/assets/img-card.jpg";
import MobileImage from "@/public/assets/img-card.jpg";
import EcommerceImage from "@/public/assets/img-card.jpg";
import UiUxImage from "@/public/assets/img-card.jpg";
import SeoImage from "@/public/assets/img-card.jpg";
import SecurityImage from "@/public/assets/img-card.jpg";

const categories = [
    {
        id: 1,
        image: WebImage,
        name: "تطوير المواقع",
        description:
            "تصميم وتطوير مواقع ويب احترافية متوافقة مع جميع الأجهزة.",
        category: "تطوير الويب",
        coursesCount: 3,
        order: 1,
        createdAt: "10 مايو 2024",
    },
    {
        id: 2,
        image: MobileImage,
        name: "تطبيقات الجوال",
        description:
            "تطوير تطبيقات iOS و Android بأداء عالٍ وتجربة مستخدم مميزة.",
        category: "تطوير التطبيقات",
        coursesCount: 10,
        order: 2,
        createdAt: "9 مايو 2024",
    },
    {
        id: 3,
        image: EcommerceImage,
        name: "التجارة الإلكترونية",
        description:
            "إنشاء متاجر إلكترونية احترافية وسريعة وآمنة.",
        category: "التجارة الإلكترونية",
        coursesCount: 1,
        order: 3,
        createdAt: "8 مايو 2024",
    },
    {
        id: 4,
        image: UiUxImage,
        name: "تصميم UI/UX",
        description:
            "تصميم واجهات وتجربة مستخدم عصرية وسهلة الاستخدام.",
        category: "تصميم",
        coursesCount: 23,
        order: 4,
        createdAt: "7 مايو 2024",
    },
    {
        id: 5,
        image: SeoImage,
        name: "تحسين محركات البحث",
        description:
            "رفع ترتيب موقعك في نتائج البحث وزيادة عدد الزيارات.",
        category: "التسويق الرقمي",
        coursesCount: 59,
        order: 5,
        createdAt: "6 مايو 2024",
    },
    {
        id: 6,
        image: SecurityImage,
        name: "أمن وحماية المواقع",
        description:
            "حماية المواقع من الاختراقات وتأمين البيانات.",
        category: "الأمان",
        coursesCount: 3,
        order: 6,
        createdAt: "5 مايو 2024",
    },
];

export default categories