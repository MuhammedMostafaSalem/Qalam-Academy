import AuthScreen from "@/components/norama/auth/AuthScreen";

export const metadata = { title: "التحقق من الحساب", robots: { index: false, follow: false } };

export default function Page() {
  return <AuthScreen variant="verify" />;
}
