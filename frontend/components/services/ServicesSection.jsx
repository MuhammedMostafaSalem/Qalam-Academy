import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import Container from "@/components/ui/Container"
import ServicesGrid from "./ServicesGrid"

const ServicesSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title="خدمتنا الرئيسية"
                />

                <div className="mt-16">
                    <ServicesGrid />
                </div>
            </Container>
        </Section>
    )
}

export default ServicesSection