"use client";

import Toolbar from "@/components/ui/Toolbar";
import ViewSwitcher from "./ViewSwitcher";
import Select from "@/components/ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const CoursesToolbar = ({ view, toggleSwitcher }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "all");
    const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "newest");

    const hasFilters = Boolean(searchQuery || (selectedLevel && selectedLevel !== "all") || (selectedSort && selectedSort !== "newest"));

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (selectedLevel && selectedLevel !== "all") params.set("level", selectedLevel);
        if (selectedSort && selectedSort !== "newest") params.set("sort", selectedSort);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, selectedLevel, selectedSort, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedLevel("all");
        setSelectedSort("newest");
    };

    const levelOptions = [
        { value: "all", label: "جميع المستويات" },
        { value: "beginner", label: "مبتدئ" },
        { value: "intermediate", label: "متوسط" },
        { value: "advanced", label: "متقدم" },
    ];

    const sortOptions = [
        { value: "newest", label: "الأحدث أولاً" },
        { value: "price_asc", label: "السعر: الأقل" },
        { value: "price_desc", label: "السعر: الأعلى" },
    ];

    return (
        <div className="mb-10">
            <Toolbar
                inputPlaceholder="ابحث عن دورة..."
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={
                    <Select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        options={levelOptions}
                    />
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
                                className="flex items-center gap-1 text-xs text-white/60 hover:text-error transition"
                                title="مسح الفلاتر"
                            >
                                <MdClose size={16} />
                                <span>مسح</span>
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