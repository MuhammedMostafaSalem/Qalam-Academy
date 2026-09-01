import BlogHero from "@/components/blog/hero/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/blog",
        title: {
            ar: "المدونة والمقالات التعليمية",
            en: "Blog & Educational Articles",
        },
        description: {
            ar: "مقالات، نصائح، وشروحات تقنية وتعليمية في مجالات البرمجة، التصميم، والذكاء الاصطناعي.",
            en: "Articles, tips, and tutorials covering programming, UI/UX design, career insights, and AI.",
        },
    });
}

export default function Blog() {
    return (
        <>
            <BlogHero />
            <BlogGrid />
        </>
    )
}
