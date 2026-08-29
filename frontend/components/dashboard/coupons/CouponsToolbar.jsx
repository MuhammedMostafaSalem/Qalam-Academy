"use client";

import { useState, useEffect } from "react";
import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";

const CouponsToolbar = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");

    const hasFilters = searchQuery || statusFilter;

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (statusFilter) params.set("status", statusFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, statusFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setStatusFilter("");
    };

    const statusOptions = [
        { value: "", label: isEn ? "All Statuses" : "كل الحالات" },
        { value: "active", label: isEn ? "Active" : "نشط" },
        { value: "expired", label: isEn ? "Expired" : "منتهي" },
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder={isEn ? "Search coupons..." : "ابحث عن كوبون..."}
                filters={
                    <>
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

export default CouponsToolbar;