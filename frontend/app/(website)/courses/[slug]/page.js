import CourseDetailsHero from "@/components/courseDetails/hero/CourseDetailsHero";
import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";

export default function CourseDetailsPage() {
    return (
        <>
            <CourseDetailsHero />

            <Section className="pb-24">
                <Container>

                    <div
                        className="
                            grid
                            gap-12
                            lg:grid-cols-[1fr_360px]
                        "
                    >
                        <div className="space-y-20">
                        </div>
                    </div>

                </Container>
            </Section>
        </>
    )
}