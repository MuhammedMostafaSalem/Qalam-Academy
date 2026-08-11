import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import CourseIncludes from "./CourseIncludes";
import InstructorCard from "./InstructorCard";
import OverviewContent from "./OverviewContent";

const CourseOverview = ({ course }) => {
    return (
        <Section>
            <Container>
                <div
                    className="
                        grid
                        gap-10
                        lg:grid-cols-[1.7fr_0.8fr]
                        items-start
                    "
                >
                    {/* Left Content */}
                    <OverviewContent course={course} />

                    {/* Sidebar */}
                    <aside
                        className="
                            flex
                            flex-col
                            gap-8
                            sticky
                            top-28
                            self-start
                        "
                    >
                        <CourseIncludes course={course} />

                        <InstructorCard course={course} />
                    </aside>
                </div>
            </Container>
        </Section>
    );
};

export default CourseOverview;