import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import ServicesHeroContent from "./ServicesHeroContent"
import ServicesHeroImage from "./ServicesHeroImage"

const ServicesHero = () => {
    return (
        <Section
            className="overflow-hidden mt-[150px]"
        >
            <Container>
                <div
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