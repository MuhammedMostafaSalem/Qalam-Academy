import AuthScreen from "@/components/norama/auth/AuthScreen";

export function generateStaticParams() {
  return [{ token: "preview" }];
}

export const metadata = { title: "إعادة تعيين كلمة المرور", robots: { index: false, follow: false } };

export default function Page() {
  return <AuthScreen variant="reset" />;
}
