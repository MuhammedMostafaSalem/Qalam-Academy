import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "إدارة التصنيفات", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="list" entity="categories" description="تصنيفات توضيحية ثابتة مرتبطة بنماذج المشاريع." />;
}
