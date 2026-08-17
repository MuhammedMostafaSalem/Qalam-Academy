"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const CoursesToolbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");

    const hasFilters = Boolean(searchQuery || (statusFilter && statusFilter !== "all"));

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, statusFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
    };

    const statusOptions = [
        { value: "all", label: "جميع الكورسات" },
        { value: "in_progress", label: "قيد التعلم" },
        { value: "completed", label: "مكتملة" },
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن كورس..."
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        options={statusOptions}
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
                            <span>مسح الفلاتر</span>
                        </button>
                    )
                }
            />
        </div>
    );
};

export default CoursesToolbar;