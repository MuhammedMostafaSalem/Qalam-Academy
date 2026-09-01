import { getSettingsAction } from "@/actions/settingsActions";
import { getLocalizedValue } from "@/utils/localization";

export const DEFAULT_SEO = {
    siteName: {
        ar: "أكاديمية قلم",
        en: "Qalam Academy",
    },
    defaultTitle: {
        ar: "أكاديمية قلم | منصة تعليمية رائدة لتطوير المهارات",
        en: "Qalam Academy | Leading Educational Platform",
    },
    defaultDescription: {
        ar: "منصة تعليمية متكاملة تقدم أفضل الكورسات والمسارات التدريبية في البرمجة والتصميم والتكنولوجيا مع شهادات معتمدة.",
        en: "An integrated educational platform offering top-tier courses, learning paths, coding, design, and career skills with certified completion.",
    },
    defaultKeywords: {
        ar: [
            "أكاديمية قلم",
            "كورسات أونلاين",
            "تعلم البرمجة",
            "دورات تصميم",
            "تعليم عن بعد",
            "شهادات معتمدة",
            "تطوير الويب",
            "منصة تعليمية"
        ],
        en: [
            "Qalam Academy",
            "Online Courses",
            "Learn Programming",
            "Design Courses",
            "E-Learning",
            "Certified Courses",
            "Web Development",
            "Education Platform"
        ],
    },
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    defaultOgImage: "/assets/logos/hero-image.png",
    twitterHandle: "@qalamacademy",
};

/**
 * Resolves the active platform language from cookies or parameters.
 */
export async function getActiveLanguage(langParam) {
    if (langParam === "ar" || langParam === "en") return langParam;
    try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const stored = cookieStore.get("NEXT_LOCALE")?.value || cookieStore.get("NEXT_LANG")?.value;
        if (stored === "ar" || stored === "en") return stored;
    } catch {
        // Safe fallback if called outside Next.js request lifecycle
    }
    return "ar";
}

/**
 * Resolves full media URL (local asset or backend upload).
 */
export function getFullMediaUrl(url, baseUrl = DEFAULT_SEO.baseUrl) {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    if (url.startsWith("/uploads") || url.startsWith("uploads/")) {
        const cleanPath = url.startsWith("/") ? url : `/${url}`;
        return `${backendUrl}${cleanPath}`;
    }
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return `${baseUrl}${cleanPath}`;
}

/**
 * Universal SEO & Metadata Generator for Next.js App Router.
 * Automatically adapts tab title, descriptions, OpenGraph, Twitter, and canonicals to platform language.
 */
export async function generateSEOMetadata({
    title,
    description,
    keywords,
    image,
    path = "",
    noIndex = false,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    tags,
    locale,
    settings: customSettings,
    isRoot = false,
} = {}) {
    const lang = await getActiveLanguage(locale);
    const isEn = lang === "en";

    let settings = customSettings;
    if (!settings) {
        try {
            const settingsResult = await getSettingsAction();
            settings = settingsResult?.success ? settingsResult.data : null;
        } catch {
            settings = null;
        }
    }

    const fallbackSiteName = DEFAULT_SEO.siteName[lang] || DEFAULT_SEO.siteName.ar;
    const siteName = settings?.siteName || fallbackSiteName;

    // Resolve Title
    let rawTitle = "";
    if (title) {
        rawTitle = getLocalizedValue(title, lang, typeof title === "string" ? title : "");
    }

    let pageTitle = "";
    if (isRoot) {
        pageTitle = rawTitle || settings?.seoTitle || DEFAULT_SEO.defaultTitle[lang];
    } else if (rawTitle) {
        if (rawTitle.includes(siteName)) {
            pageTitle = rawTitle;
        } else {
            pageTitle = `${rawTitle} | ${siteName}`;
        }
    } else {
        pageTitle = settings?.seoTitle || DEFAULT_SEO.defaultTitle[lang];
    }

    // Resolve Description
    let rawDescription = "";
    if (description) {
        rawDescription = getLocalizedValue(description, lang, typeof description === "string" ? description : "");
    }
    const pageDescription =
        rawDescription ||
        settings?.seoDescription ||
        settings?.siteDescription ||
        DEFAULT_SEO.defaultDescription[lang];

    // Resolve Keywords
    const defaultLangKeywords = DEFAULT_SEO.defaultKeywords[lang] || [];
    const settingsKeywords = Array.isArray(settings?.seoKeywords) ? settings.seoKeywords : [];
    let customKeywords = [];
    if (Array.isArray(keywords)) {
        customKeywords = keywords;
    } else if (typeof keywords === "string") {
        customKeywords = keywords.split(",").map((k) => k.trim()).filter(Boolean);
    } else if (keywords && typeof keywords === "object") {
        const localizedKeywords = getLocalizedValue(keywords, lang, "");
        if (Array.isArray(localizedKeywords)) {
            customKeywords = localizedKeywords;
        } else if (typeof localizedKeywords === "string") {
            customKeywords = localizedKeywords.split(",").map((k) => k.trim()).filter(Boolean);
        }
    }

    const combinedKeywords = Array.from(
        new Set([...customKeywords, ...settingsKeywords, ...defaultLangKeywords])
    );

    // Resolve Canonical & Base URLs
    const siteUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");
    const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
    const canonicalUrl = `${siteUrl}${cleanPath}`;

    // Resolve Image
    const fallbackImage = getFullMediaUrl(DEFAULT_SEO.defaultOgImage, siteUrl);
    const resolvedImage = image ? getFullMediaUrl(image, siteUrl) : (settings?.logoDark ? getFullMediaUrl(settings.logoDark, siteUrl) : fallbackImage);

    // Favicon
    const faviconUrl = settings?.favicon ? getFullMediaUrl(settings.favicon, siteUrl) : "/favicon.ico";

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: combinedKeywords,
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                "ar": canonicalUrl,
                "en": canonicalUrl,
                "x-default": canonicalUrl,
            },
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            siteName: siteName,
            locale: isEn ? "en_US" : "ar_EG",
            type: type,
            images: [
                {
                    url: resolvedImage,
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                },
            ],
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
            ...(authors && { authors: Array.isArray(authors) ? authors : [authors] }),
            ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
            images: [resolvedImage],
            site: DEFAULT_SEO.twitterHandle,
            creator: DEFAULT_SEO.twitterHandle,
        },
        robots: noIndex
            ? {
                index: false,
                follow: false,
                nocache: true,
                googleBot: {
                    index: false,
                    follow: false,
                    noimageindex: true,
                    "max-video-preview": -1,
                    "max-image-preview": "none",
                    "max-snippet": -1,
                },
            }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        icons: {
            icon: faviconUrl,
            apple: faviconUrl,
        },
    };
}

/**
 * Structured Data (JSON-LD) Schemas
 */

export function generateOrganizationJsonLd(settings, lang = "ar") {
    const siteUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");
    const siteName = settings?.siteName || DEFAULT_SEO.siteName[lang];
    const logo = settings?.logoDark ? getFullMediaUrl(settings.logoDark, siteUrl) : `${siteUrl}/assets/logos/logo-blue.png`;

    const socialLinks = [
        settings?.facebook,
        settings?.twitter,
        settings?.linkedin,
        settings?.youtube,
        settings?.instagram,
        settings?.tiktok,
    ].filter(Boolean);

    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteName,
        "url": siteUrl,
        "logo": logo,
        ...(socialLinks.length > 0 && { "sameAs": socialLinks }),
        ...(settings?.supportEmail || settings?.supportPhone ? {
            "contactPoint": {
                "@type": "ContactPoint",
                ...(settings?.supportPhone && { "telephone": settings.supportPhone }),
                ...(settings?.supportEmail && { "email": settings.supportEmail }),
                "contactType": "customer service",
                "availableLanguage": ["Arabic", "English"],
            }
        } : {}),
    };
}

export function generateWebSiteJsonLd(settings, lang = "ar") {
    const siteUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");
    const siteName = settings?.siteName || DEFAULT_SEO.siteName[lang];

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteName,
        "url": siteUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/courses?search={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}

export function generateCourseJsonLd(course, settings, lang = "ar") {
    if (!course) return null;
    const siteUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");
    const siteName = settings?.siteName || DEFAULT_SEO.siteName[lang];

    const courseTitle = getLocalizedValue(course.title, lang, "Course");
    const courseDescription = getLocalizedValue(course.description, lang, "");
    const image = course.thumbnail ? getFullMediaUrl(course.thumbnail, siteUrl) : `${siteUrl}/assets/logos/hero-image.png`;
    const instructorName = typeof course.instructor === "object"
        ? `${course.instructor?.firstName || ""} ${course.instructor?.lastName || ""}`.trim() || course.instructor?.name || siteName
        : course.instructor || siteName;

    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": courseTitle,
        "description": courseDescription,
        "provider": {
            "@type": "Organization",
            "name": siteName,
            "sameAs": siteUrl,
        },
        "instructor": {
            "@type": "Person",
            "name": instructorName,
        },
        "image": image,
        "offers": {
            "@type": "Offer",
            "price": course.discountPrice !== undefined && course.discountPrice !== null ? course.discountPrice : (course.price || 0),
            "priceCurrency": settings?.currency || "EGP",
            "category": "Paid",
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "inLanguage": course.language || (lang === "ar" ? "Arabic" : "English"),
        },
    };
}

export function generateBlogPostingJsonLd(blog, settings, lang = "ar") {
    if (!blog) return null;
    const siteUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");
    const siteName = settings?.siteName || DEFAULT_SEO.siteName[lang];

    const blogTitle = getLocalizedValue(blog.title, lang, "Blog Post");
    const blogExcerpt = getLocalizedValue(blog.excerpt || blog.content, lang, "");
    const image = blog.featuredImage ? getFullMediaUrl(blog.featuredImage, siteUrl) : `${siteUrl}/assets/logos/hero-image.png`;
    const authorName = typeof blog.author === "object"
        ? `${blog.author?.firstName || ""} ${blog.author?.lastName || ""}`.trim() || siteName
        : blog.author || siteName;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogTitle,
        "description": blogExcerpt,
        "image": image,
        "datePublished": blog.createdAt || new Date().toISOString(),
        "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
        "author": {
            "@type": "Person",
            "name": authorName,
        },
        "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
                "@type": "ImageObject",
                "url": settings?.logoDark ? getFullMediaUrl(settings.logoDark, siteUrl) : `${siteUrl}/assets/logos/logo-blue.png`,
            },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteUrl}/blog/${blog.slug || blog._id}`,
        },
    };
}

export function generateCreativeWorkJsonLd(project, settings, lang = "ar") {
    if (!project) return null;
    const siteUrl = DEFAULT_SEO.baseUrl.replace(/\/$/, "");
    const siteName = settings?.siteName || DEFAULT_SEO.siteName[lang];

    const title = getLocalizedValue(project.title, lang, "Project");
    const description = getLocalizedValue(project.description, lang, "");
    const image = project.thumbnail || project.coverImage || (Array.isArray(project.images) && project.images[0]) ? getFullMediaUrl(project.thumbnail || project.coverImage || project.images[0], siteUrl) : `${siteUrl}/assets/logos/hero-image.png`;

    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": title,
        "description": description,
        "image": image,
        "creator": {
            "@type": "Organization",
            "name": siteName,
        },
    };
}
