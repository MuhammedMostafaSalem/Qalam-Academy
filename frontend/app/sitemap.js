export const dynamic = "force-static";

const publicRoutes = ["", "/about", "/services", "/projects", "/contact", "/faq"];
const projectSlugs = ["nawa-market", "namaa-insights", "saha-care"];

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!baseUrl) return [];

  const now = new Date();
  return [
    ...publicRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
