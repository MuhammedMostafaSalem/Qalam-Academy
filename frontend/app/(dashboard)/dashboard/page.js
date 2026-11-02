import DashboardWorkspace from "@/components/norama/dashboard/DashboardWorkspace";

export const metadata = { title: "لوحة الإدارة", robots: { index: false, follow: false } };

export default function Page() {
  return <DashboardWorkspace mode="overview" />;
}
