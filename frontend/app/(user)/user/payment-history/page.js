import PaymentHistoryClientView from "@/components/user/dashboard/payment-hاistory/PaymentHistoryClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/payment-history",
        title: {
            ar: "سجل المدفوعات",
            en: "Payment History",
        },
        description: {
            ar: "سجل بجميع العمليات المالية والمدفوعات الخاصة بحسابك في أكاديمية قلم.",
            en: "Review all transactions, invoices, and payment logs on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function PaymentHistoryPage() {
    return <PaymentHistoryClientView />;
}