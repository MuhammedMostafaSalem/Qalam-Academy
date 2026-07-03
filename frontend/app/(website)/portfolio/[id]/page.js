import ProjectChallenges from "@/components/project/challenges/ProjectChallenges";
import ProjectFeatures from "@/components/project/features/ProjectFeatures";
import ProjectOverview from "@/components/project/overview/ProjectOverview";
import ProjectImage from "@/components/project/ProjectImage";
import RelatedProjects from "@/components/project/related/RelatedProjects";
import ProjectResults from "@/components/project/results/ProjectResults";
import ProjectTechStack from "@/components/project/techStack/ProjectTechStack";

export default function ProjectPage() {
    return (
        <>
            <ProjectImage />
            <ProjectOverview />
            <ProjectFeatures />
            <ProjectTechStack />
            <ProjectChallenges />
            <ProjectResults />
            <RelatedProjects />
        </>
    )
}