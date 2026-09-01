import RegisterLayout from "@/components/layout/auth/RegisterLayout";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/register",
        title: {
            ar: "إنشاء حساب جديد",
            en: "Create Account",
        },
        description: {
            ar: "انضم إلى أكاديمية قلم وابدأ رحلتك في تعلم البرمجة والمهارات الرقمية الحديثة.",
            en: "Join Qalam Academy and start your journey learning coding and digital skills.",
        },
        noIndex: true,
    });
}

export default function Register() {
    return <RegisterLayout />
}