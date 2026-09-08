import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import ServicesHeroContent from "./ServicesHeroContent"
import ServicesHeroImage from "./ServicesHeroImage"
import { fadeUp } from "@/lib/animationHelpers"
import ServicesHeroBackground from "./ServicesHeroBackground"

const ServicesHero = () => {
    return (
        <Section
            className="relative isolate overflow-hidden pt-[150px]"
        >
            <ServicesHeroBackground />

            <div className="relative z-10">
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
            </div>
        </Section>
    )
}

export default ServicesHero