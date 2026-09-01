import CTASection from "@/components/services/CTASection";
import ServicesHero from "@/components/services/hero/ServicesHero";
import ProcessSection from "@/components/services/process/ProcessSection";
import ServicesSection from "@/components/services/ServicesSection";
import WhyChooseSection from "@/components/services/whyChoose/WhyChooseSection";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/services",
        title: {
            ar: "خدماتنا التعليمية والتدريبية",
            en: "Our Educational & Training Services",
        },
        description: {
            ar: "نقدم حلولاً تعليمية واستشارية متكاملة للأفراد والشركات لتطوير الكفاءات الرقمية.",
            en: "Comprehensive educational and consulting services for individuals and enterprises to foster digital excellence.",
        },
    });
}

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <ServicesSection />
            <WhyChooseSection />
            <ProcessSection />
            <CTASection />
        </>
    )
}