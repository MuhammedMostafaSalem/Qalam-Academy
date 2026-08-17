"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import { getPortfoliosAction } from "@/actions/portfolioActions";
import { projects as fallbackProjects } from "@/constants/projects";

const RelatedProjectsGrid = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const res = await getPortfoliosAction("limit=3");
                if (res.success && Array.isArray(res.data) && res.data.length > 0) {
                    setPortfolios(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch related projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRelated();
    }, []);

    const displayProjects = portfolios.length > 0 ? portfolios : fallbackProjects.slice(0, 3);

    return (
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
    );
};

export default RelatedProjectsGrid;