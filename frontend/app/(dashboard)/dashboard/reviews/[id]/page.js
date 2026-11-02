import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export function generateStaticParams() {
  return [{ id: "REV-003" }, { id: "REV-001" }];
}

export const metadata = { title: "تفاصيل التقييم", robots: { index: false, follow: false } };

export default async function Page({ params }) {
  const { id } = await params;
  return <DashboardWorkspace mode="detail" entity="reviews" recordId={id} title="تفاصيل التقييم" description="سجل توضيحي ثابت — لا يوجد تقييم مستخدم فعلي." />;
}
