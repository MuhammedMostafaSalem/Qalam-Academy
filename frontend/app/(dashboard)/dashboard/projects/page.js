import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إدارة المشاريع", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="list" entity="projects" description="استعراض نماذج المشاريع الثابتة. لا يتم إنشاء أو تعديل أي محتوى." />;
}
