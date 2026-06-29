import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import HeroBackground from "./HeroBackground"
import HeroContent from "./HeroContent"
import HeroImage from "./HeroImage"
import HeroPartners from "./HeroPartners"

const Hero = () => {
    return (
        <Section className="relative overflow-hidden min-h-screen pt-[110px] flex flex-col">

            <HeroBackground />

            <Container>
                <div
                    className="
                        grid
                        items-center
                        gap-16
                        lg:grid-cols-2
                    "
                >
                    <HeroContent />
                    <HeroImage />
                </div>


            </Container>
            
            <HeroPartners />

        </Section>
    )
}

export default Hero