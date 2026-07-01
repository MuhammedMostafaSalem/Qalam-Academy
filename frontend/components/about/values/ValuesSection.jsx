import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import Container from "@/components/ui/Container"
import ValuesGrid from "./ValuesGrid"

const ValuesSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title="قيمنا الأساسية"
                />

                <div className="mt-16">
                    <ValuesGrid />
                </div>
            </Container>
        </Section>
    )
}

export default ValuesSection