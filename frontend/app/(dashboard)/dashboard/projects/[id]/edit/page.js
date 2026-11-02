import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";
import { PROJECTS } from "@/data/norama";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export const metadata = { title: "تعديل مشروع", robots: { index: false, follow: false } };

export default async function Page({ params }) {
  const { id } = await params;
  return <DashboardWorkspace mode="form" entity="project" recordId={id} title="تعديل مشروع" description="نموذج تعديل ثابت للمعاينة؛ التغييرات غير محفوظة." />;
}
