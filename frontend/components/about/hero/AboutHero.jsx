import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import AboutHeroContent from "./AboutHeroContent";
import AboutHeroImage from "./AboutHeroImage";
import CompanyStats from "./CompanyStats";
import { fadeUp } from "@/lib/animationHelpers";

const AboutHero = () => {
    return (
        <Section className="mt-[150px]">
            <Container>

                <div
                    {...fadeUp()}
                    className="grid items-center gap-12 lg:grid-cols-2"
                >

                    <AboutHeroImage />

                    <AboutHeroContent />

                </div>

                <CompanyStats />

            </Container>
        </Section>
    )
}

export default AboutHero