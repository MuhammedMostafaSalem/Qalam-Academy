import Section from "@/components/sections/Section";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import Container from "@/components/ui/Container";
import RelatedProjectsGrid from "./RelatedProjectsGrid";

const RelatedProjects = () => {
    return (
        <Section className="mt-[80px]">
            <Container>
                <div className="mx-auto mb-12 max-w-3xl flex flex-col gap-3 items-center text-center">
                    <SectionTitle>
                        مشاريع مشابهة
                    </SectionTitle>

                    <SectionDescription>
                        اكتشف المزيد من المشاريع التي قمنا بتنفيذها
                        باستخدام أحدث التقنيات وأفضل الممارسات.
                    </SectionDescription>
                </div>

                <RelatedProjectsGrid />
            </Container>
        </Section>
    );
};

export default RelatedProjects;