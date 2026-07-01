import ServicesHero from "@/components/services/hero/ServicesHero";
import ProcessSection from "@/components/services/process/ProcessSection";
import ServicesSection from "@/components/services/ServicesSection";
import WhyChooseSection from "@/components/services/whyChoose/WhyChooseSection";

export default function Courses() {
    return (
        <>
            <ServicesHero />
            <ServicesSection />
            <WhyChooseSection />
            <ProcessSection />
        </>
    )
}