import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import TeamSlider from "@/components/slider/TeamSlider";
import Container from "@/components/ui/Container";

const TeamSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title="فريقنا المبدع"
                />

                <div className="mt-16">
                    <TeamSlider />
                </div>
            </Container>
        </Section>
    )
}

export default TeamSection