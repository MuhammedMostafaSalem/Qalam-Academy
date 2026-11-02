import AuthScreen from "@/components/norama/auth/AuthScreen";

export const metadata = { title: "إنشاء حساب", robots: { index: false, follow: false } };

export default function Page() {
  return <AuthScreen variant="register" />;
}
