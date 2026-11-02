import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إدارة المستخدمين", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="list" entity="users" description="لا توجد حسابات حقيقية في النسخة الثابتة؛ المعروض بيانات توضيحية فقط." />;
}
