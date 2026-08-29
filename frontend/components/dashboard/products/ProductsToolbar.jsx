"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCategoriesAction } from "@/actions/categoryActions";
import { MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";

const ProductsToolbar = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("isPublished") || "");
    const [categories, setCategories] = useState([]);

    const hasFilters = Boolean(searchQuery || categoryFilter || statusFilter);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategoriesAction("type=product&limit=100");
            if (res.success) {
                const list = res.data?.categories || res.data?.documents || res.data || [];
                setCategories(list);
            }
        };
        fetchCategories();
    }, [language]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (categoryFilter) params.set("category", categoryFilter);
        if (statusFilter) params.set("isPublished", statusFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, categoryFilter, statusFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setCategoryFilter("");
        setStatusFilter("");
    };

    const categoryOptions = [
        { value: "", label: isEn ? "All Categories" : "كل التصنيفات" },
        ...categories.map((c) => ({
            value: c._id,
            label: localize(c.title, isEn ? "Category" : "تصنيف")
        }))
    ];

    const statusOptions = [
        { value: "", label: isEn ? "All Statuses" : "كل الحالات" },
        { value: "true", label: isEn ? "Published" : "منشور" },
        { value: "false", label: isEn ? "Draft" : "مسودة" }
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder={isEn ? "Search products..." : "ابحث عن منتج..."}
                filters={
                    <>
                        <Select
                            options={categoryOptions}
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />
                        <Select
                            options={statusOptions}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        />
                    </>
                }
                actions={
                    <>
                        {hasFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-4 py-2
                                    text-sm text-text-secondary
                                    hover:text-error
                                    transition
                                "
                            >
                                <MdClose size={16} />
                                <span>{isEn ? "Clear Filters" : "مسح الفلاتر"}</span>
                            </button>
                        )}
                    </>
                }
            />
        </div>
    );
};

export default ProductsToolbar;
