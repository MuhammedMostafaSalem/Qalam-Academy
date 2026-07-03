import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import CoursesContent from "./CoursesContent";

const CoursesSection = () => {
    return (
        <Section className="pt-[80px]">
            <Container>
                <CoursesContent />
            </Container>
        </Section>
    );
};

export default CoursesSection;