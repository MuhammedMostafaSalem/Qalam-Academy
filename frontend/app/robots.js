export const dynamic = "force-static";

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/services", "/projects", "/contact", "/faq"],
      disallow: ["/dashboard/", "/user/", "/login", "/register", "/forgot-password", "/reset-password/", "/verify-otp"],
    },
    ...(baseUrl ? { sitemap: `${baseUrl}/sitemap.xml` } : {}),
  };
}
