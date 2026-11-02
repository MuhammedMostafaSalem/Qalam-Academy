import { notFound } from "next/navigation";
import ProjectDetailsPage from "@/components/norama/public/ProjectDetailsPage";
import { PROJECTS } from "@/data/norama";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  return { title: project?.name || "تفاصيل المشروع", description: project?.summary || "تفاصيل مفهوم مشروع رقمي." };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetailsPage project={project} />;
}
