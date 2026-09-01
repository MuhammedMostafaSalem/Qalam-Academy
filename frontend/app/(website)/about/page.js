import AboutHero from "@/components/about/hero/AboutHero";
import PartnersSection from "@/components/about/partners/PartnersSection";
import StorySection from "@/components/about/story/StorySection";
import TeamSection from "@/components/about/team/TeamSection";
import ValuesSection from "@/components/about/values/ValuesSection";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/about",
        title: {
            ar: "من نحن",
            en: "About Us",
        },
        description: {
            ar: "تعرف على أكاديمية قلم، رؤيتنا، رسالتنا، وفريق العمل والشركاء الذين يقودون التميز التعليمي.",
            en: "Learn more about Qalam Academy, our mission, vision, team, and educational partners.",
        },
    });
}

export default function About() {
    return (
        <>
            <AboutHero />
            <StorySection />
            <ValuesSection />
            <TeamSection />
            <PartnersSection />
        </>
    );
}