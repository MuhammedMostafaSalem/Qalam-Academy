import Section from "@/components/sections/Section";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";

const CourseDetailsHero = () => {
    return (
        <Section
            className="
                relative
                overflow-hidden
                pt-[120px]
                pb-20
            "
        >
            <Container>

                <Breadcrumb
                    items={[
                        {
                            label: "الرئيسية",
                            href: "/",
                        },
                        {
                            label: "الكورسات",
                            href: "/courses",
                        },
                        {
                            label: "Frontend Development",
                        },
                    ]}
                />

                <div
                    className="
                        mt-12
                        grid
                        items-center
                        gap-16
                        lg:grid-cols-2
                    "
                >
                    <HeroImage />

                    <HeroContent />
                </div>

            </Container>
        </Section>
    );
};

export default CourseDetailsHero;