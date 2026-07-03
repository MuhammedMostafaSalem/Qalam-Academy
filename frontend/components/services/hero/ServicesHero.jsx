import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import ServicesHeroContent from "./ServicesHeroContent"
import ServicesHeroImage from "./ServicesHeroImage"
import { fadeUp } from "@/lib/animationHelpers"
import ServicesHeroBackground from "./ServicesHeroBackground"

const ServicesHero = () => {
    return (
        <Section
            className="relative overflow-hidden mt-[150px]"
        >
            <ServicesHeroBackground />
            <Container>
                <div
                    {...fadeUp()}
                    className="
                        grid
                        items-center
                        gap-16
                        lg:grid-cols-2
                    "
                >
                    <ServicesHeroContent />

                    <ServicesHeroImage />

                </div>
            </Container>
        </Section>
    )
}

export default ServicesHero