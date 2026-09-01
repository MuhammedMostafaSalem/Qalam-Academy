import { DEFAULT_SEO } from "@/utils/seo";
import { getCoursesAction } from "@/actions/courseActions";
import { getBlogsAction } from "@/actions/blogActions";
import { getPortfoliosAction } from "@/actions/portfolioActions";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap() {
    const baseUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");

    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/store`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];

    let dynamicCourses = [];
    try {
        const coursesRes = await getCoursesAction("isPublished=true&limit=100");
        const courses = coursesRes?.success && Array.isArray(coursesRes.data) ? coursesRes.data : [];
        dynamicCourses = courses
            .filter((c) => c.slug || c._id)
            .map((c) => ({
                url: `${baseUrl}/courses/${c.slug || c._id}`,
                lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
                changeFrequency: "weekly",
                priority: 0.85,
            }));
    } catch {
        dynamicCourses = [];
    }

    let dynamicBlogs = [];
    try {
        const blogsRes = await getBlogsAction("isPublished=true&limit=100");
        const blogs = blogsRes?.success && Array.isArray(blogsRes.data) ? blogsRes.data : [];
        dynamicBlogs = blogs
            .filter((b) => b.slug || b._id)
            .map((b) => ({
                url: `${baseUrl}/blog/${b.slug || b._id}`,
                lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
                changeFrequency: "weekly",
                priority: 0.75,
            }));
    } catch {
        dynamicBlogs = [];
    }

    let dynamicPortfolio = [];
    try {
        const portfolioRes = await getPortfoliosAction("limit=100");
        const items = portfolioRes?.success && Array.isArray(portfolioRes.data) ? portfolioRes.data : [];
        dynamicPortfolio = items
            .filter((p) => p._id)
            .map((p) => ({
                url: `${baseUrl}/portfolio/${p._id}`,
                lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
                changeFrequency: "monthly",
                priority: 0.65,
            }));
    } catch {
        dynamicPortfolio = [];
    }

    return [...staticRoutes, ...dynamicCourses, ...dynamicBlogs, ...dynamicPortfolio];
}
