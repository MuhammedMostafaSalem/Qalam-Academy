"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import PaymentHistoryTable from "@/components/user/dashboard/payment-hاistory/PaymentHistoryTable";
import PaymentHistoryToolbar from "@/components/user/dashboard/payment-hاistory/PaymentHistoryToolbar";
import { useLanguage } from "@/providers/LanguageProvider";

export default function PaymentHistoryPage() {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title={isEn ? "Payment History" : "سجل المدفوعات"}
                description={isEn ? "View all your payment transactions, invoice amounts, and payment methods" : "استعرض جميع عمليات الدفع، حالتها، ووسائل الدفع المستخدمة"}
            />

            <PaymentHistoryToolbar />

            <PaymentHistoryTable />
        </div>
    );
}