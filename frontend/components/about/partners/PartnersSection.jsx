import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import Container from "@/components/ui/Container";
import PartnersGrid from "./PartnersGrid";

const PartnersSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container className="glass rounded-fullCard py-2">
                <SectionHeader
                    center
                    title="ثقة شركائنا"
                />

                <PartnersGrid />
            </Container>
        </Section>
    )
}

export default PartnersSection