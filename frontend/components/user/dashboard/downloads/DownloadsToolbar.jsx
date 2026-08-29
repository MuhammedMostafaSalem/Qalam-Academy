"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";

const DownloadsToolbar = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all");

    const hasFilters = Boolean(searchQuery || (typeFilter && typeFilter !== "all"));

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (typeFilter && typeFilter !== "all") params.set("type", typeFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, typeFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setTypeFilter("all");
    };

    const typeOptions = [
        { value: "all", label: isEn ? "All Files" : "جميع الملفات" },
        { value: "PDF", label: isEn ? "PDF Files" : "ملفات PDF" },
        { value: "ZIP", label: isEn ? "ZIP Archives" : "أرشيف ZIP" },
    ];

    return (
        <Toolbar
            inputPlaceholder={isEn ? "Search files..." : "ابحث عن ملف..."}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={
                <Select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    options={typeOptions}
                />
            }
            actions={
                hasFilters && (
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
                )
            }
        />
    );
};

export default DownloadsToolbar;