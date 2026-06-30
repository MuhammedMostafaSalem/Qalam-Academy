import Section from "../sections/Section"
import SectionHeader from "../sections/SectionHeader"
import Container from "../ui/Container"
import ServicesGrid from "./ServicesGrid"

const Services = () => {
    return (
        <Section>

            <Container>

                <SectionHeader
                    badge="خدماتنا"
                    title={
                        <>حلول برمجية متكاملة<br/>تدفع أعمالك للأمام</>
                    }
                    description="نوفر مجموعة واسعة من الخدمات التقنية المصممة لمساعدتك على الأنتاج في عالم رقمي متطور"
                    center
                    className="mb-16"
                />

                <ServicesGrid />

            </Container>

        </Section>
    )
}

export default Services