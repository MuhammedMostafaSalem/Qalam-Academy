import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import WhyChooseContent from "./WhyChooseContent"
import WhyChooseImage from "./WhyChooseImage"

const WhyChooseSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <div
                    className="
                        grid
                        items-center
                        gap-16
                        lg:grid-cols-2
                    "
                >
                    <WhyChooseContent />

                    <WhyChooseImage />
                </div>
            </Container>
        </Section>
    )
}

export default WhyChooseSection