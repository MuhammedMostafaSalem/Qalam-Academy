"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCategoriesAction } from "@/actions/categoryActions";
import { useLanguage } from "@/providers/LanguageProvider";

const CoursesToolbar = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
    const [levelFilter, setLevelFilter] = useState(searchParams.get("level") || "");
    const [publishedFilter, setPublishedFilter] = useState(searchParams.get("isPublished") || "");
    const [featuredFilter, setFeaturedFilter] = useState(searchParams.get("isFeatured") || "");

    const categoryOptions = [
        { value: "", label: isEn ? "All Categories" : "كل التصنيفات" },
        ...categories.map((category) => ({
            value: category._id,
            label: localize(category.title, isEn ? "Category" : "تصنيف"),
        })),
    ];

    useEffect(() => {
        getCategoriesAction("type=course&limit=100").then((result) => {
            if (result.success && Array.isArray(result.data)) setCategories(result.data);
        });
    }, [language]);

    const levelOptions = [
        { value: "", label: isEn ? "All Levels" : "كل المستويات" },
        { value: "beginner", label: isEn ? "Beginner" : "مبتدئ" },
        { value: "intermediate", label: isEn ? "Intermediate" : "متوسط" },
        { value: "advanced", label: isEn ? "Advanced" : "متقدم" },
    ];

    const publishedOptions = [
        { value: "", label: isEn ? "All Status" : "كل الحالات" },
        { value: "true", label: isEn ? "Published" : "منشور" },
        { value: "false", label: isEn ? "Draft" : "مسودة" },
    ];

    const featuredOptions = [
        { value: "", label: isEn ? "All (Featured/Standard)" : "الكل (مميز/عادي)" },
        { value: "true", label: isEn ? "Featured" : "مميز" },
        { value: "false", label: isEn ? "Standard" : "عادي" },
    ];

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (categoryFilter) params.set("category", categoryFilter);
        if (levelFilter) params.set("level", levelFilter);
        if (publishedFilter) params.set("isPublished", publishedFilter);
        if (featuredFilter) params.set("isFeatured", featuredFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        // تجنب دفع نفس المسار عند التحميل حتى لا تلغي عملية جلب الكورسات
        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, categoryFilter, levelFilter, publishedFilter, featuredFilter, pathname, router]);

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder={isEn ? "Search courses..." : "ابحث عن كورس..."}
                filters={
                    <>
                        <Select
                            options={categoryOptions}
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />
                        <Select
                            options={levelOptions}
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                        />
                        <Select
                            options={publishedOptions}
                            value={publishedFilter}
                            onChange={(e) => setPublishedFilter(e.target.value)}
                        />
                        <Select
                            options={featuredOptions}
                            value={featuredFilter}
                            onChange={(e) => setFeaturedFilter(e.target.value)}
                        />
                    </>
                }
            />
        </div>
    );
};

export default CoursesToolbar;
