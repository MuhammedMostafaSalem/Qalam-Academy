import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import PortfolioHeroBackground from "./PortfolioHeroBackground";
import PortfolioHeroContent from "./PortfolioHeroContent";

const PortfolioHero = () => {
    return (
        <Section
            className="
                relative
                overflow-hidden
                pt-[120px]
                pb-[80px]
            "
        >
            <PortfolioHeroBackground />

            <Container>
                <PortfolioHeroContent />
            </Container>
        </Section>
    );
};

export default PortfolioHero;