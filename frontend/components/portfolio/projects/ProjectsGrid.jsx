"use client";

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import ProjectCard from "../ProjectCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import LoadMore from "@/components/shared/LoadMore";
import usePortfolios from "@/hooks/portfolio/usePortfolios";
import { projects as fallbackProjects } from "@/constants/projects";

const ProjectsGrid = () => {
    const { portfolios, loading, error } = usePortfolios("limit=20");

    const displayProjects = portfolios && portfolios.length > 0 ? portfolios : fallbackProjects;

    if (loading) {
        return (
            <Section className="pb-24">
                <Container>
                    <div className="text-center py-12 text-white/60">
                        جاري تحميل المشاريع...
                    </div>
                </Container>
            </Section>
        );
    }

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
                    {displayProjects.map((project, index) => (
                        <div
                            key={project._id || project.id || index}
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