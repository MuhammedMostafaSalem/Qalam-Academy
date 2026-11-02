import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "رسائل التواصل", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="list" entity="messages" description="لا يتم استقبال رسائل من نموذج التواصل في هذه النسخة." />;
}
