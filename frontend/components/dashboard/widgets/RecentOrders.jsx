import CardHeader from "@/components/ui/CardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import OrderItem from "./OrderItem";

const RecentOrders = ({ orders = [] }) => {
    return (
        <DashboardCard className="h-full">

            <CardHeader
                title="أحدث الطلبات"
                subtitle="أحدث عمليات الشراء من العملاء"
            />

            <div className="space-y-4">

                {orders.map((order) => (
                    <OrderItem
                        key={order.id}
                        {...order}
                    />
                ))}

            </div>

        </DashboardCard>
    );
};

export default RecentOrders;