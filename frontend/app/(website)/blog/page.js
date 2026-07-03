import BlogHero from "@/components/blog/hero/BlogHero";
import PortfolioFilters from "@/components/portfolio/filters/PortfolioFilters";
import ProjectsGrid from "@/components/portfolio/projects/ProjectsGrid";

export default function Blog() {
    return (
        <>
            <BlogHero />
            <PortfolioFilters />
            <ProjectsGrid />
        </>
    )
} 