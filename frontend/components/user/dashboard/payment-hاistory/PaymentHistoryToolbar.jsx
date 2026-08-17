"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const PaymentHistoryToolbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [methodFilter, setMethodFilter] = useState(searchParams.get("method") || "all");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");

    const hasFilters = Boolean(searchQuery || (methodFilter && methodFilter !== "all") || (statusFilter && statusFilter !== "all"));

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (methodFilter && methodFilter !== "all") params.set("method", methodFilter);
        if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, methodFilter, statusFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setMethodFilter("all");
        setStatusFilter("all");
    };

    const methodOptions = [
        { value: "all", label: "جميع وسائل الدفع" },
        { value: "paymob", label: "بطاقة ائتمان (Paymob)" },
        { value: "paypal", label: "بايبال (PayPal)" },
        { value: "cash", label: "الدفع عند الاستلام (Cash)" },
    ];

    const statusOptions = [
        { value: "all", label: "جميع الحالات" },
        { value: "paid", label: "ناجحة" },
        { value: "pending", label: "قيد المعالجة" },
        { value: "cancelled", label: "ملغاة" },
    ];

    return (
        <Toolbar
            inputPlaceholder="ابحث برقم العملية أو الطلب..."
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={
                <div className="flex flex-wrap items-center gap-3">
                    <Select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        options={methodOptions}
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
                        <span>مسح الفلاتر</span>
                    </button>
                )
            }
        />
    );
};

export default PaymentHistoryToolbar;