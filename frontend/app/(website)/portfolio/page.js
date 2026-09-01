import PortfolioCTA from "@/components/portfolio/CTA/PortfolioCTA";
import PortfolioHero from "@/components/portfolio/hero/PortfolioHero";
import ProjectsGrid from "@/components/portfolio/projects/ProjectsGrid";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/portfolio",
        title: {
            ar: "معرض الأعمال والمشاريع",
            en: "Portfolio & Projects Showcase",
        },
        description: {
            ar: "استعرض نماذج من أعمال ومشاريع طلاب أكاديمية قلم وتطبيقاتهم الاحترافية.",
            en: "Discover projects and portfolio work crafted by Qalam Academy students and instructors.",
        },
    });
}

export default function PortfolioPage() {
    return (
        <>
            <PortfolioHero />
            <ProjectsGrid />
            <PortfolioCTA />
        </>
    )
}
