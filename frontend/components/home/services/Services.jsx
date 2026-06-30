import Section from "@/components/sections/Section"
import SectionHeader from "@/components/sections/SectionHeader"
import Container from "@/components/ui/Container"
import ServicesIllustration from "./ServicesIllustration"
import ServicesGrid from "@/components/services/ServicesGrid"

const Services = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <SectionHeader
                    badge="خدماتنا"
                    title={
                        <>حلول برمجية متكاملة<br />تدفع أعمالك للأمام</>
                    }
                    description="نوفر مجموعة واسعة من الخدمات التقنية المصممة لمساعدتك على الأنتاج في عالم رقمي متطور"
                    center
                    className="mb-16"
                />

                <div className="
                    mt-16
                    grid
                    grid-cols-1
                    lg:grid-cols-12
                    gap-12
                    xl:gap-20
                    items-center
                ">
                    <div className="lg:col-span-5 hidden lg:flex justify-center">
                        <ServicesIllustration />
                    </div>
                    <div className="lg:col-span-7">
                        <ServicesGrid />
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Services