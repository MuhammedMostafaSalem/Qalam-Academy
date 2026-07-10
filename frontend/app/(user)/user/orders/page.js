import PageHeader from "@/components/dashboard/PageHeader";
import OrdersTable from "@/components/user/dashboard/orders/OrdersTable";
import OrdersToolbar from "@/components/user/dashboard/orders/OrdersToolbar";

export default function MyOrdersPage() {
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
                title="طلباتي"
                description="جميع الطلبات التي قمت بها داخل المنصة مع إمكانية متابعة حالتها"
            />

            <OrdersToolbar />

            <OrdersTable />
        </div>
    );
}