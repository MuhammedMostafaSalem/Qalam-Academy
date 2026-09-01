import ProjectOverview from "@/components/project/overview/ProjectOverview";
import ProjectImage from "@/components/project/ProjectImage";
import RelatedProjects from "@/components/project/related/RelatedProjects";
import { getPortfolioByIdAction } from "@/actions/portfolioActions";
import { notFound } from "next/navigation";
import { generateSEOMetadata, generateCreativeWorkJsonLd } from "@/utils/seo";
import JsonLd from "@/components/shared/JsonLd";

export async function generateMetadata({ params }) {
    const { id } = await params;
    if (!id) return generateSEOMetadata();

    const result = await getPortfolioByIdAction(id);
    const project = result?.success ? result.data : null;

    if (!project) {
        return generateSEOMetadata({
            title: { ar: "المشروع غير موجود", en: "Project Not Found" },
            noIndex: true,
        });
    }

    return generateSEOMetadata({
        path: `/portfolio/${id}`,
        title: project.title,
        description: project.description,
        image: project.image || project.thumbnail,
    });
}

export default async function ProjectPage({ params }) {
    const { id } = await params;
    const result = await getPortfolioByIdAction(id);

    if (!result.success || !result.data) notFound();

    const project = result.data;

    return (
        <>
            <JsonLd data={generateCreativeWorkJsonLd(project)} />
            <ProjectImage project={project} />
            <ProjectOverview project={project} />
            <RelatedProjects project={project} />
        </>
    )
}
