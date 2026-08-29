"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";

const OrdersToolbar = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");

    const hasFilters = Boolean(searchQuery || (typeFilter && typeFilter !== "all") || (statusFilter && statusFilter !== "all"));

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (typeFilter && typeFilter !== "all") params.set("type", typeFilter);
        if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, typeFilter, statusFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setTypeFilter("all");
        setStatusFilter("all");
    };

    const typeOptions = [
        { value: "all", label: isEn ? "All Types" : "جميع الأنواع" },
        { value: "course", label: isEn ? "Courses" : "كورسات" },
        { value: "product", label: isEn ? "Digital Products" : "منتجات رقمية" },
        { value: "mixed", label: isEn ? "Mixed Orders" : "طلبات مختلطة" },
    ];

    const statusOptions = [
        { value: "all", label: isEn ? "All Statuses" : "جميع الحالات" },
        { value: "paid", label: isEn ? "Completed (Paid)" : "مكتملة (مدفوعة)" },
        { value: "pending", label: isEn ? "Pending" : "قيد المعالجة" },
        { value: "cancelled", label: isEn ? "Cancelled" : "ملغاة" },
    ];

    return (
        <Toolbar
            inputPlaceholder={isEn ? "Search by order number..." : "ابحث برقم الطلب..."}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={
                <div className="flex flex-wrap items-center gap-3">
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        options={typeOptions}
                    />

                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        options={statusOptions}
                    />
                </div>
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

export default OrdersToolbar;