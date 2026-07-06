import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import { projects } from "@/constants/projects";
import ProjectCard from "../ProjectCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import LoadMore from "@/components/shared/LoadMore";

const ProjectsGrid = () => {
    return (
        <Section className="pb-24">
            <Container>
                <div
                    className="
                        grid
                        gap-8

                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {projects.map((project, index) => (
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

                <LoadMore />
            </Container>
        </Section>
    );
};

export default ProjectsGrid;