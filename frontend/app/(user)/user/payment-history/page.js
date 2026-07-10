import PageHeader from "@/components/dashboard/PageHeader";
import PaymentHistoryTable from "@/components/user/dashboard/payment-hاistory/PaymentHistoryTable";
import PaymentHistoryToolbar from "@/components/user/dashboard/payment-hاistory/PaymentHistoryToolbar";

export default function PaymentHistoryPage() {
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
                title="سجل المدفوعات"
                description="استعرض جميع عمليات الدفع، حالتها، ووسائل الدفع المستخدمة"
            />

            <PaymentHistoryToolbar />

            <PaymentHistoryTable />
        </div>
    );
}