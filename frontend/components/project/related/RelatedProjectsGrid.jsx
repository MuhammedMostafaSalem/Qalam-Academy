import ProjectCard from "@/components/portfolio/ProjectCard";
import { projects } from "@/constants/projects";
import { cardAnimation } from "@/lib/animation/cardAnimation";

const RelatedProjectsGrid = () => {
    return (
        <div
            className="
                grid
                gap-8
                md:grid-cols-2
                xl:grid-cols-3
            "
        >
            {projects.slice(0, 3).map((project, index) => (
                <div
                    key={index}
                    {...cardAnimation(index)}
                >
                    <ProjectCard
                        project={project}
                    />
                </div>
            ))}
        </div>
    );
};

export default RelatedProjectsGrid;