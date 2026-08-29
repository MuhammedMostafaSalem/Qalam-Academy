"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Toolbar from "@/components/ui/Toolbar";
import Select from "@/components/ui/Select";
import useBlogs from "@/hooks/blog/useBlogs";
import { getCategoriesAction } from "@/actions/categoryActions";
import { useLanguage } from "@/providers/LanguageProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export default function BlogGrid() {
    const { language, localize } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);

    const queryString = useMemo(() => {
        const params = new URLSearchParams({ limit: "20", isPublished: "true" });
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (selectedCategory !== "all") params.set("category", selectedCategory);
        return params.toString();
    }, [searchQuery, selectedCategory]);

    const { blogs, loading, error } = useBlogs(queryString);

    useEffect(() => {
        getCategoriesAction("type=blog&isActive=true&limit=100").then((result) => {
            if (result.success && Array.isArray(result.data)) setCategories(result.data);
        });
    }, [language]);

    const categoryOptions = [
        { value: "all", label: language === "en" ? "All Categories" : "جميع التصنيفات" },
        ...categories.map((category) => ({
            value: category._id,
            label: localize(category.title, language === "en" ? "Category" : "تصنيف"),
        })),
    ];

    return (
        <section className="py-16">
            <Container>
                <Toolbar
                    inputPlaceholder={language === "en" ? "Search articles..." : "ابحث في المقالات..."}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filters={
                        <Select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            options={categoryOptions}
                        />
                    }
                />

                {loading ? (
                    <div className="py-16 text-center text-text-secondary">
                        {language === "en" ? "Loading articles..." : "جاري تحميل المقالات..."}
                    </div>
                ) : error ? (
                    <div className="py-16 text-center text-error">{error}</div>
                ) : blogs.length === 0 ? (
                    <div className="py-16 text-center text-text-muted">
                        {language === "en" ? "No published articles match the selected filters" : "لا توجد مقالات منشورة تطابق عوامل التصفية"}
                    </div>
                ) : (
                    <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {blogs.map((blog) => {
                            const title = localize(blog.title, language === "en" ? "Article" : "مقال");
                            const excerpt = localize(blog.excerpt);
                            const image = blog.featuredImage
                                ? (blog.featuredImage.startsWith("http") ? blog.featuredImage : `${BASE_URL}${blog.featuredImage}`)
                                : "/assets/img-card.jpg";

                            return (
                                <article key={blog._id} className="overflow-hidden rounded-3xl border border-border bg-background-alt">
                                    <div className="relative h-56">
                                        <Image src={image} alt={title} fill unoptimized className="object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-primary">
                                            {localize(blog.category?.title, language === "en" ? "Uncategorized" : "غير مصنف")}
                                        </p>
                                        <h2 className="mt-3 text-xl font-bold text-text-primary">{title}</h2>
                                        {excerpt && <p className="mt-3 line-clamp-3 leading-7 text-text-secondary">{excerpt}</p>}
                                        <Link href={`/blog/${blog.slug || blog._id}`} className="mt-5 inline-flex font-semibold text-primary">
                                            {language === "en" ? "Read article" : "قراءة المقال"}
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </Container>
        </section>
    );
}
