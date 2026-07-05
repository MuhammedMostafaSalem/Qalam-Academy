import HeroBackground from "@/components/home/hero/HeroBackground"
import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import { fadeIn } from "@/lib/animationHelpers"
import HeroContent from "./HeroContent"
import HeroStats from "./HeroStats"

const Hero = () => {
    return (
        <Section
            {...fadeIn()}
            className="
                relative
                overflow-hidden
                pt-[110px]
                pb-[50px]
            "
        >
            <HeroBackground />
            
            <Container>
                <HeroContent />
                <HeroStats />
            </Container>
        </Section>
    )
}

export default Hero