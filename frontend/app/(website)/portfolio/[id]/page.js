import ProjectOverview from "@/components/project/overview/ProjectOverview";
import ProjectImage from "@/components/project/ProjectImage";
import RelatedProjects from "@/components/project/related/RelatedProjects";
import { getPortfolioByIdAction } from "@/actions/portfolioActions";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }) {
    const { id } = await params;
    const result = await getPortfolioByIdAction(id);

    if (!result.success || !result.data) notFound();

    const project = result.data;

    return (
        <>
            <ProjectImage project={project} />
            <ProjectOverview project={project} />
            <RelatedProjects project={project} />
        </>
    )
}
