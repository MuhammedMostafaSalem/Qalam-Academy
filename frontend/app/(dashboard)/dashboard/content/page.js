import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "محتوى الموقع", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="content" />;
}
