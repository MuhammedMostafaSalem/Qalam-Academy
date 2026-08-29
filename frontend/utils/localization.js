/**
 * Universal localization helper.
 * Extracts the appropriate string from either:
 * 1. An already-translated string returned from the backend API.
 * 2. A bilingual object { ar: "...", en: "..." } from forms, fallbacks, or raw models.
 * 3. A fallback string if value is null/undefined.
 */
export function getLocalizedValue(value, lang = "ar", fallback = "") {
    const safeFallback =
        typeof fallback === "string"
            ? fallback
            : typeof fallback === "number" || typeof fallback === "boolean"
            ? String(fallback)
            : "";

    if (value === null || value === undefined) {
        return safeFallback;
    }

    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    if (typeof value === "object") {
        // Direct match for current language
        if (value[lang] && typeof value[lang] === "string" && value[lang].trim() !== "") {
            return value[lang];
        }

        // Secondary fallback to the other language
        const altLang = lang === "ar" ? "en" : "ar";
        if (value[altLang] && typeof value[altLang] === "string" && value[altLang].trim() !== "") {
            return value[altLang];
        }

        // Check if object has _translations
        if (value._translations && typeof value._translations === "object") {
            const nested =
                value._translations[lang] ||
                value._translations[altLang] ||
                value._translations.ar ||
                value._translations.en;
            if (typeof nested === "string" && nested.trim() !== "") {
                return nested;
            }
            if (nested && typeof nested === "object") {
                if (typeof nested[lang] === "string" && nested[lang].trim() !== "") {
                    return nested[lang];
                }
                if (typeof nested[altLang] === "string" && nested[altLang].trim() !== "") {
                    return nested[altLang];
                }
            }
        }
    }

    return safeFallback;
}

export const uiTranslations = {
    ar: {
        home: "الرئيسية",
        about: "من نحن",
        services: "خدماتنا",
        courses: "كورساتنا",
        portfolio: "المعرض",
        store: "المتجر",
        blog: "المدونة",
        contact: "تواصل معنا",
        login: "تسجيل دخول",
        register: "إنشاء حساب",
        cart: "سلة الشراء",
        allCourses: "جميع الكورسات",
        loadMore: "عرض المزيد",
        loading: "جاري التحميل...",
        error: "حدث خطأ ما",
        noData: "لا توجد بيانات متاحة",
        search: "بحث...",
        filter: "تصفية",
        sort: "ترتيب",
        price: "السعر",
        currency: "ج.م",
        minutes: "دقيقة",
        hours: "ساعات",
        lesson: "درس",
        lessons: "دروس",
        student: "طالب",
        students: "طلاب",
        instructor: "المدرب",
        rating: "تقييم",
        reviews: "تقييمات",
        myCourses: "كورساتي",
        certificates: "الشهادات",
        downloads: "التنزيلات",
        wishlist: "المفضلة",
        orders: "الطلبات",
        paymentHistory: "سجل المدفوعات",
        settings: "الإعدادات",
        profile: "الملف الشخصي",
        continueLearning: "أكمل تعلمك",
        resumeFromWhereYouLeft: "تابع من حيث توقفت",
        progress: "التقدم",
        continueWatching: "متابعة التعلم",
        nextLesson: "الدرس التالي",
        save: "حفظ",
        cancel: "إلغاء",
        edit: "تعديل",
        delete: "حذف",
        viewAll: "عرض الكل",
        viewDetails: "عرض التفاصيل",
    },
    en: {
        home: "Home",
        about: "About Us",
        services: "Services",
        courses: "Courses",
        portfolio: "Portfolio",
        store: "Store",
        blog: "Blog",
        contact: "Contact",
        login: "Log In",
        register: "Sign Up",
        cart: "Shopping Cart",
        allCourses: "All Courses",
        loadMore: "Load More",
        loading: "Loading...",
        error: "Something went wrong",
        noData: "No data available",
        search: "Search...",
        filter: "Filter",
        sort: "Sort",
        price: "Price",
        currency: "EGP",
        minutes: "min",
        hours: "hrs",
        lesson: "lesson",
        lessons: "lessons",
        student: "Student",
        students: "Students",
        instructor: "Instructor",
        rating: "Rating",
        reviews: "Reviews",
        myCourses: "My Courses",
        certificates: "Certificates",
        downloads: "Downloads",
        wishlist: "Wishlist",
        orders: "Orders",
        paymentHistory: "Payment History",
        settings: "Settings",
        profile: "Profile",
        continueLearning: "Continue Learning",
        resumeFromWhereYouLeft: "Resume where you left off",
        progress: "Progress",
        continueWatching: "Continue Watching",
        nextLesson: "Next Lesson",
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        viewAll: "View All",
        viewDetails: "View Details",
    }
};

export function getUITranslation(key, lang = "ar", fallback = "") {
    const dict = uiTranslations[lang] || uiTranslations.ar;
    return dict[key] || fallback || key;
}
