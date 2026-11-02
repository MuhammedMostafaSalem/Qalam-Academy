import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إدارة التقييمات", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="list" entity="reviews" description="أمثلة ثابتة لتوضيح شكل قائمة التقييمات؛ لا توجد مراجعات حقيقية." />;
}
