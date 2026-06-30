import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import PortfolioSlider from "@/components/slider/PortfolioSlider"
import Container from "@/components/ui/Container"

const PortfolioSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    badge="أعمالنا"
                    title="مشاريع نفتخر بانجازها"
                    description="استعرض مجموعة من أحدث المشاريع التي قمنا بتنفيذها باستخدام أحدث التقنيات مع التركيز على الجودة وتجربة المستخدم."
                    center
                    className="mb-16"
                />
                
                <PortfolioSlider />
            </Container>
        </Section>
    )
}

export default PortfolioSection