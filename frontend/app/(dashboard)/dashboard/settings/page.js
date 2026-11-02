import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إعدادات الموقع", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="settings" entity="settings" title="إعدادات الموقع" description="البيانات المعروضة ثابتة داخل الواجهة ولا يتم حفظ أي تغيير." />;
}
