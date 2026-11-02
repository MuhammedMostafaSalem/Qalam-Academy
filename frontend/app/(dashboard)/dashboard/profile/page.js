import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "الملف الشخصي للإدارة", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="form" entity="profile" title="الملف الشخصي" description="واجهة إعدادات للمعاينة فقط؛ لا توجد بيانات مدير أو حفظ للتغييرات." />;
}
