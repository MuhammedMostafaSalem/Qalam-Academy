import CourseCurriculum from "@/components/courseDetails/curriculum/CourseCurriculum";
import CourseDetailsHero from "@/components/courseDetails/hero/CourseDetailsHero";
import CourseOverview from "@/components/courseDetails/overview/CourseOverview";
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
                            <CourseOverview />
                            <CourseCurriculum />
                        </div>
                    </div>

                </Container>
            </Section>
        </>
    )
}