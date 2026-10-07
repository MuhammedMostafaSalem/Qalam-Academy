"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import { useState, useEffect } from "react";

import { MdClose } from "react-icons/md";

import { useLanguage } from "@/providers/LanguageProvider";

const PageSectionsToolbar = () => {
    const { language } = useLanguage();

    const isEn = language === "en";

    const router = useRouter();

    const pathname = usePathname();

    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || ""
    );

    const [statusFilter, setStatusFilter] = useState(
        searchParams.get("status") || ""
    );

    useEffect(() => {
        setSearchQuery(
            searchParams.get("search") || ""
        );

        setStatusFilter(
            searchParams.get("status") || ""
        );
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) {
            params.set("search", searchQuery);
        }

        if (statusFilter) {
            params.set("status", statusFilter);
        }

        const queryString = params.toString();

        const target = `${pathname}${
            queryString
                ? `?${queryString}`
                : ""
        }`;

        // تجنب دفع نفس المسار عند التحميل
        if (
            `${window.location.pathname}${window.location.search}` !==
            target
        ) {
            router.push(target, {
                scroll: false,
            });
        }
    }, [
        searchQuery,
        statusFilter,
        pathname,
        router,
    ]);

    const statusOptions = [
        {
            value: "",
            label: isEn
                ? "All Status"
                : "كل الحالات",
        },
        {
            value: "active",
            label: isEn
                ? "Active"
                : "نشط",
        },
        {
            value: "inactive",
            label: isEn
                ? "Inactive"
                : "غير نشط",
        },
    ];

    const hasFilters =
        searchQuery || statusFilter;

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("");

        router.push(pathname, {
            scroll: false,
        });
    };

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder={
                    isEn
                        ? "Search by page, key or type..."
                        : "ابحث بالصفحة أو المفتاح أو النوع..."
                }
                filters={
                    <div className="flex flex-wrap gap-3 items-center">
                        <Select
                            options={statusOptions}
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                }
                actions={
                    hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-border
                                px-5
                                py-3
                                text-sm
                                transition
                                hover:bg-card-hover
                            "
                        >
                            <MdClose size={18} />

                            {isEn
                                ? "Clear Filters"
                                : "مسح الفلاتر"}
                        </button>
                    )
                }
            />
        </div>
    );
};

export default PageSectionsToolbar;