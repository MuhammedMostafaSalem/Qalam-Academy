import Section from "@/components/sections/Section";
import SectionHeader from "@/components/sections/SectionHeader";
import CoursesSlider from "@/components/slider/CoursesSlider";
import Container from "@/components/ui/Container";

const FeaturedCourses = () => {
    return (
        <Section className="pt-[80px]">

            <Container>

                <SectionHeader
                    badge="كورستنا"
                    title="تعلم من الخبراء وطور مهاراتك"
                    description="كورسات عملية تساعدك على دخول سوق العمل بثقة من خلال مشاريع حقيقية وتطبيقات عملية."
                    button="عرض جميع الكورسات"
                    href="/courses"
                    center
                    className="mb-16"
                />

                <CoursesSlider />

            </Container>

        </Section>
    );
}

export default FeaturedCourses