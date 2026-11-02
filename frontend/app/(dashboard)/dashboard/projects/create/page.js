import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إضافة مشروع", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="form" entity="project" title="إضافة مشروع" description="نموذج إدخال للمعاينة فقط؛ لا يتم حفظ المعلومات." />;
}
