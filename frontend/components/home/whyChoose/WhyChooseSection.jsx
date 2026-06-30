import Section from '@/components/sections/Section'
import SectionHeader from '@/components/sections/SectionHeader'
import Container from '@/components/ui/Container'
import FeaturesGrid from './FeaturesGrid'

const WhyChooseSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    center
                    title="لماذا تختارنا؟"
                />

                <div className="mt-14">
                    <FeaturesGrid />
                </div>
            </Container>
        </Section>
    )
}

export default WhyChooseSection