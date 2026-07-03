import PortfolioCTA from "@/components/portfolio/CTA/PortfolioCTA";
import PortfolioFilters from "@/components/portfolio/filters/PortfolioFilters";
import PortfolioHero from "@/components/portfolio/hero/PortfolioHero";
import ProjectsGrid from "@/components/portfolio/projects/ProjectsGrid";

export default function PortfolioPage() {
    return (
        <>
            <PortfolioHero />
            <PortfolioFilters />
            <ProjectsGrid />
            <PortfolioCTA />
        </>
    )
}