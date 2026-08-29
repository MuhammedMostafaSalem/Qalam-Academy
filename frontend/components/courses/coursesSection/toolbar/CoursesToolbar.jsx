"use client";

import Toolbar from "@/components/ui/Toolbar";
import ViewSwitcher from "./ViewSwitcher";
import Select from "@/components/ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { getCategoriesAction } from "@/actions/categoryActions";
import { useLanguage } from "@/providers/LanguageProvider";

const CoursesToolbar = ({ view, toggleSwitcher }) => {
    const { language, localize } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "all");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
    const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "newest");
    const [categories, setCategories] = useState([]);

    const hasFilters = Boolean(searchQuery || selectedCategory !== "all" || selectedLevel !== "all" || selectedSort !== "newest");

    useEffect(() => {
        getCategoriesAction("type=course&isActive=true&limit=100").then((result) => {
            if (result.success && Array.isArray(result.data)) setCategories(result.data);
        });
    }, [language]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (selectedCategory !== "all") params.set("category", selectedCategory);
        if (selectedLevel && selectedLevel !== "all") params.set("level", selectedLevel);
        if (selectedSort && selectedSort !== "newest") params.set("sort", selectedSort);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, selectedCategory, selectedLevel, selectedSort, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedLevel("all");
        setSelectedSort("newest");
    };

    const levelOptions = [
        { value: "all", label: language === "en" ? "All Levels" : "جميع المستويات" },
        { value: "beginner", label: language === "en" ? "Beginner" : "مبتدئ" },
        { value: "intermediate", label: language === "en" ? "Intermediate" : "متوسط" },
        { value: "advanced", label: language === "en" ? "Advanced" : "متقدم" },
    ];

    const categoryOptions = [
        { value: "all", label: language === "en" ? "All Categories" : "جميع التصنيفات" },
        ...categories.map((category) => ({ value: category._id, label: localize(category.title) })),
    ];

    const sortOptions = [
        { value: "newest", label: language === "en" ? "Newest First" : "الأحدث أولاً" },
        { value: "price_asc", label: language === "en" ? "Price: Low to High" : "السعر: الأقل" },
        { value: "price_desc", label: language === "en" ? "Price: High to Low" : "السعر: الأعلى" },
    ];

    return (
        <div className="mb-10">
            <Toolbar
                inputPlaceholder={language === "en" ? "Search for courses..." : "ابحث عن دورة..."}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={
                    <div className="flex gap-3">
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            options={categoryOptions}
                        />
                        <Select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            options={levelOptions}
                        />
                    </div>
                }
                actions={
                    <div className="flex items-center gap-3">
                        <Select
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value)}
                            options={sortOptions}
                        />
                        {hasFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-1 text-xs text-text-secondary hover:text-error transition"
                                title={language === "en" ? "Clear Filters" : "مسح الفلاتر"}
                            >
                                <MdClose size={16} />
                                <span>{language === "en" ? "Clear" : "مسح"}</span>
                            </button>
                        )}
                        <ViewSwitcher
                            view={view}
                            toggleSwitcher={toggleSwitcher}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default CoursesToolbar;
