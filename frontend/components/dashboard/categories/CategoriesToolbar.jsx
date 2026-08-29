"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { getCategoriesAction } from "@/actions/categoryActions";
import { useLanguage } from "@/providers/LanguageProvider";

const CategoriesToolbar = ({
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    onClear
}) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const hasFilters = searchQuery || typeFilter || statusFilter;
    const [dynamicTypes, setDynamicTypes] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await getCategoriesAction("limit=100");
            if (res.success) {
                const list = res.data?.categories || res.data?.documents || res.data || [];
                const uniqueTypes = Array.from(new Set(list.map((c) => c.type))).filter(Boolean);
                setDynamicTypes(uniqueTypes);
            }
        };
        fetchAllCategories();
    }, []);

    const typeOptions = [
        { value: "", name: isEn ? "All Types" : "كل الانواع" },
        ...dynamicTypes.map((type) => ({
            value: type,
            name: type.charAt(0).toUpperCase() + type.slice(1)
        }))
    ];

    const statusOptions = [
        { value: "", name: isEn ? "All Statuses" : "كل الحالات" },
        { value: "true", name: isEn ? "Active" : "نشط" },
        { value: "false", name: isEn ? "Inactive" : "معطل" }
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder={isEn ? "Search categories..." : "ابحث عن تصنيف..."}
                filters={
                    <>
                        <Select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            values={typeOptions}
                        />

                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            values={statusOptions}
                        />
                    </>
                }
                actions={
                    hasFilters && (
                        <button
                            onClick={onClear}
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
        </div>
    );
};

export default CategoriesToolbar;