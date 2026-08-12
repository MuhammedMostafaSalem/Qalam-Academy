"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useCourses from "@/hooks/courses/useCourses";

const CoursesToolbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { courses } = useCourses();
    
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
    const [levelFilter, setLevelFilter] = useState(searchParams.get("level") || "");

    const categoryOptions = [
        { value: "", label: "كل التصنيفات" },
        ...Array.from(new Set(courses.map((c) => c.category?.title?.ar || c.category)))
            .filter(Boolean)
            .map((cat, i) => ({ value: cat, label: cat })),
    ];

    const levelOptions = [
        { value: "", label: "كل المستويات" },
        { value: "beginner", label: "مبتدئ" },
        { value: "intermediate", label: "متوسط" },
        { value: "advanced", label: "متقدم" },
    ];

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (categoryFilter) params.set("category", categoryFilter);
        if (levelFilter) params.set("level", levelFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        // تجنب دفع نفس المسار عند التحميل حتى لا تلغي عملية جلب الكورسات
        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, categoryFilter, levelFilter, pathname, router]);

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder="ابحث عن كورس..."
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
                    </>
                }
            />
        </div>
    );
};

export default CoursesToolbar;