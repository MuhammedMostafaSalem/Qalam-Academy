import WebImage from "@/public/assets/img-card.jpg";
import MobileImage from "@/public/assets/img-card.jpg";
import EcommerceImage from "@/public/assets/img-card.jpg";
import UiUxImage from "@/public/assets/img-card.jpg";
import SeoImage from "@/public/assets/img-card.jpg";
import SecurityImage from "@/public/assets/img-card.jpg";

const courses = [
    {
        id: 1,
        image: WebImage,
        name: "تطوير المواقع",
        description:
        "تصميم وتطوير مواقع ويب احترافية متوافقة مع جميع الأجهزة.",
        instractor: "مروان سالم",
        price: "$49.99",
        category: "تطوير الويب",
        status: "نشطة",
        order: 1,
        createdAt: "10 مايو 2024",
    },
    {
        id: 2,
        image: MobileImage,
        name: "تطبيقات الجوال",
        description:
            "تطوير تطبيقات iOS و Android بأداء عالٍ وتجربة مستخدم مميزة.",
        instractor: "مروان سالم",
        price: "$49.99",
        category: "تطوير التطبيقات",
        status: "نشطة",
        order: 2,
        createdAt: "9 مايو 2024",
    },
    {
        id: 3,
        image: EcommerceImage,
        name: "التجارة الإلكترونية",
        description:
            "إنشاء متاجر إلكترونية احترافية وسريعة وآمنة.",
        instractor: "مروان سالم",
        price: "$49.99",
        category: "التجارة الإلكترونية",
        status: "نشطة",
        order: 3,
        createdAt: "8 مايو 2024",
    },
    {
        id: 4,
        image: UiUxImage,
        name: "تصميم UI/UX",
        description:
            "تصميم واجهات وتجربة مستخدم عصرية وسهلة الاستخدام.",
        instractor: "مروان سالم",
        price: "$49.99",
        category: "تصميم",
        status: "نشطة",
        order: 4,
        createdAt: "7 مايو 2024",
    },
    {
        id: 5,
        image: SeoImage,
        name: "تحسين محركات البحث",
        description:
            "رفع ترتيب موقعك في نتائج البحث وزيادة عدد الزيارات.",
        instractor: "مروان سالم",
        price: "$49.99",
        category: "التسويق الرقمي",
        status: "مسودة",
        order: 5,
        createdAt: "6 مايو 2024",
    },
    {
        id: 6,
        image: SecurityImage,
        name: "أمن وحماية المواقع",
        description:
            "حماية المواقع من الاختراقات وتأمين البيانات.",
        instractor: "مروان سالم",
        price: "$49.99",
        category: "الأمان",
        status: "غير نشطة",
        order: 6,
        createdAt: "5 مايو 2024",
    },
];

export default courses;