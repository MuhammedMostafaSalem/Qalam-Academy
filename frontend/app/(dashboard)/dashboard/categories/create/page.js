import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إضافة تصنيف", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="form" entity="category" title="إضافة تصنيف" description="نموذج إدخال للمعاينة فقط؛ لا يتم حفظ المعلومات." />;
}
