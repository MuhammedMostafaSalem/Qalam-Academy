import AboutHero from "@/components/about/hero/AboutHero";
import StorySection from "@/components/about/story/StorySection";
import TeamSection from "@/components/about/team/TeamSection";
import ValuesSection from "@/components/about/values/ValuesSection";

export default function About() {
    return (
        <>
            <AboutHero />
            <StorySection />
            <ValuesSection />
            <TeamSection />
        </>
    );
}