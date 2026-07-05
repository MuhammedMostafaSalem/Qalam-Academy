import PortfolioFilters from "@/components/portfolio/filters/PortfolioFilters";
import ProjectsGrid from "@/components/portfolio/projects/ProjectsGrid";
import Hero from "@/components/store/hero/Hero";

export default function Store() {
    return (
        <>
            <Hero />
            <PortfolioFilters />
            <ProjectsGrid />
        </>
    )
}