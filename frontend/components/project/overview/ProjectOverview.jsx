import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import ProjectContent from "./ProjectContent";
import ProjectSidebar from "./ProjectSidebar";

const ProjectOverview = () => {
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
                    <ProjectContent />

                    <ProjectSidebar />
                </div>
            </Container>
        </Section>
    );
};

export default ProjectOverview;