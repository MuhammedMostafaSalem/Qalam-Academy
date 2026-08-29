import PortfolioCTA from "@/components/portfolio/CTA/PortfolioCTA";
import PortfolioHero from "@/components/portfolio/hero/PortfolioHero";
import ProjectsGrid from "@/components/portfolio/projects/ProjectsGrid";

export default function PortfolioPage() {
    return (
        <>
            <PortfolioHero />
            <ProjectsGrid />
            <PortfolioCTA />
        </>
    )
}
