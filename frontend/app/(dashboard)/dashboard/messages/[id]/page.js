import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export function generateStaticParams() {
  return [{ id: "MSG-005" }, { id: "MSG-002" }];
}

export const metadata = { title: "تفاصيل الرسالة", robots: { index: false, follow: false } };

export default async function Page({ params }) {
  const { id } = await params;
  return <DashboardWorkspace mode="detail" entity="messages" recordId={id} title="تفاصيل الرسالة" description="سجل توضيحي ثابت — لا توجد رسالة واردة حقيقية." />;
}
