import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import CoursesHeroBackground from "./CoursesHeroBackground";
import CoursesHeroContent from "./CoursesHeroContent";
import CoursesHeroImage from "./CoursesHeroImage";
import { fadeIn } from "@/lib/animationHelpers";

const CoursesHero = () => {
    return (
        <Section
            {...fadeIn()}
            className="
                relative
                isolate
                overflow-hidden
                py-[120px]
            "
        >
            <CoursesHeroBackground />

            <div className="relative z-10">
                <Container>
                    <div
                        className="
                            grid
                            items-center
                            gap-16
                            lg:grid-cols-2
                        "
                    >
                        <CoursesHeroImage />

                        <CoursesHeroContent />
                    </div>
                </Container>
            </div>
        </Section>
    );
};

export default CoursesHero;