import AccountWorkspace from "@/components/norama/dashboard/AccountWorkspace";

export const metadata = { title: "ملفي الشخصي", robots: { index: false, follow: false } };

export default function Page() {
  return <AccountWorkspace mode="profile" />;
}
