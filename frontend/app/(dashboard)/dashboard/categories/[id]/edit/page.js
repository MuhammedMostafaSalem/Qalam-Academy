import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export function generateStaticParams() {
  return [{ id: "cat-ecommerce" }, { id: "cat-dashboard" }, { id: "cat-health" }];
}

export const metadata = { title: "تعديل تصنيف", robots: { index: false, follow: false } };

export default async function Page({ params }) {
  const { id } = await params;
  return <DashboardWorkspace mode="form" entity="category" recordId={id} title="تعديل تصنيف" description="نموذج تعديل ثابت للمعاينة؛ التغييرات غير محفوظة." />;
}
