import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import TestimonialsSlider from "@/components/slider/TestimonialsSlider"
import Container from "@/components/ui/Container"

const TestimonialsSection = () => {
    return (
        <Section className="pt-[80px]">

            <Container>

                <SectionHeader
                    badge="تجارب عملائنا"
                    title="ماذا يقول عملائنا عنا"
                    center
                    className="mb-16"
                />

                <TestimonialsSlider />

            </Container>

        </Section>
    )
}

export default TestimonialsSection