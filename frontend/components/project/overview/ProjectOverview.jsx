import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import ProjectContent from "./ProjectContent";
import ProjectSidebar from "./ProjectSidebar";

const ProjectOverview = ({ project }) => {
    return (
        <Section >
            <Container>
                <div
                    className="
                        grid
                        gap-12
                        lg:grid-cols-[1fr_350px]
                    "
                >
                    <ProjectContent project={project} />

                    <ProjectSidebar project={project} />
                </div>
            </Container>
        </Section>
    );
};

export default ProjectOverview;
