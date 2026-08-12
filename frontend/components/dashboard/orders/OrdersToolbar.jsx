"use client";

import { useState, useEffect } from "react";
import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdClose } from "react-icons/md";

const OrdersToolbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [methodFilter, setMethodFilter] = useState(searchParams.get("paymentMethodType") || "");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");

    const hasFilters = searchQuery || methodFilter || statusFilter;

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("search", searchQuery);
        if (methodFilter) params.set("paymentMethodType", methodFilter);
        if (statusFilter) params.set("status", statusFilter);

        const queryString = params.toString();
        const target = `${pathname}${queryString ? `?${queryString}` : ""}`;

        if (`${window.location.pathname}${window.location.search}` !== target) {
            router.push(target, { scroll: false });
        }
    }, [searchQuery, methodFilter, statusFilter, pathname, router]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setMethodFilter("");
        setStatusFilter("");
    }

    const paymentOptions = [
        { value: "", label: "كل الطرق" },
        { value: "card", label: "بطاقة ائتمان" },
        { value: "wallet", label: "محفظة إلكترونية" },
        { value: "fawry", label: "فوري" },
        { value: "cash", label: "نقدي" },
        { value: "paypal", label: "PayPal" },
    ];

    const statusOptions = [
        { value: "", label: "كل الحالات" },
        { value: "pending", label: "قيد الانتظار" },
        { value: "paid", label: "مدفوع" },
        { value: "cancelled", label: "ملغى" },
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder="ابحث عن طلب..."
                filters={
                    <>
                        <Select
                            options={paymentOptions}
                            value={methodFilter}
                            onChange={(e) => setMethodFilter(e.target.value)}
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
                                <span>مسح الفلاتر</span>
                            </button>
                        )}
                    </>
                }
            />
        </div>
    )
}

export default OrdersToolbar