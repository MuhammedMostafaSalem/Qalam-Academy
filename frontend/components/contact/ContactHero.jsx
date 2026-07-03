import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/sections/Section";
import ContactHeroBackground from "./ContactHeroBackground";
import ContactHeader from "./ContactHeader";
import ContactSection from "./ContactSection";
import { fadeUp } from "@/lib/animationHelpers";


const ContactHero = () => {
    return (
        <Section
            {...fadeUp()}
            className="
                relative
                overflow-hidden
                pt-[120px]
            "
        >
            {/* Background Glow */}
            <ContactHeroBackground />

            <Container>

                {/* Breadcrumb */}

                {/* <div className="mb-10 flex justify-end">
                </div> */}
                    <Breadcrumb
                        items={[
                            {
                                label: "الرئيسية",
                                href: "/",
                            },
                            {
                                label: "تواصل معنا",
                            },
                        ]}
                    />

                {/* Hero Header */}

                <ContactHeader />

                {/* Contact Layout */}

                <div className="mt-16">
                    <ContactSection />
                </div>

            </Container>
        </Section>
    );
};

export default ContactHero;