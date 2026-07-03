import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import BlogHeroBackground from "./BlogHeroBackground";
import BlogHeroContent from "./BlogHeroContent";

const BlogHero = () => {
    return (
        <Section
            className="
                relative
                overflow-hidden
                pt-[150px]
                pb-24
            "
        >
            <BlogHeroBackground />

            <Container>
                <BlogHeroContent />
            </Container>
        </Section>
    );
};

export default BlogHero;