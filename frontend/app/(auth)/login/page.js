import LoginLayout from "@/components/layout/auth/LoginLayout";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
  return generateSEOMetadata({
    path: "/login",
    title: {
      ar: "تسجيل الدخول",
      en: "Log In",
    },
    description: {
      ar: "تسجيل الدخول إلى حسابك في أكاديمية قلم للوصول إلى دوراتك ومتابعة تقدمك التعليمي.",
      en: "Log in to your Qalam Academy account to access your courses and track learning progress.",
    },
    noIndex: true,
  });
}

export default function Login() {
  return <LoginLayout />
}
