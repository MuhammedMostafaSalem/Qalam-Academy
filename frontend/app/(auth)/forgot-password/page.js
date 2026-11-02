import AuthScreen from "@/components/norama/auth/AuthScreen";

export const metadata = { title: "استعادة كلمة المرور", robots: { index: false, follow: false } };

export default function Page() {
  return <AuthScreen variant="forgot" />;
}
