import AccountWorkspace from "@/components/norama/dashboard/AccountWorkspace";

export const metadata = { title: "تغيير كلمة المرور", robots: { index: false, follow: false } };

export default function Page() {
  return <AccountWorkspace mode="password" />;
}
