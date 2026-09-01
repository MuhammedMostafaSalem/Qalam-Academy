import { DEFAULT_SEO } from "@/utils/seo";

export default function robots() {
    const baseUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");

    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/",
                    "/about",
                    "/courses",
                    "/courses/*",
                    "/blog",
                    "/blog/*",
                    "/portfolio",
                    "/portfolio/*",
                    "/services",
                    "/store",
                    "/contact",
                ],
                disallow: [
                    "/dashboard/",
                    "/dashboard/*",
                    "/user/",
                    "/user/*",
                    "/api/",
                    "/api/*",
                    "/login",
                    "/register",
                    "/forgot-password",
                    "/reset-password",
                    "/verify-otp",
                    "/payment/",
                    "/payment/*",
                    "/cart",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
