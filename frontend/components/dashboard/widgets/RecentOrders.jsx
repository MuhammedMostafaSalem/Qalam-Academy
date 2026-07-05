import CardHeader from "@/components/ui/CardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import ordersData from "./ordersData";
import OrderItem from "./OrderItem";

const RecentOrders = () => {
    return (
        <DashboardCard className="h-full">

            <CardHeader
                title="Recent Orders"
                subtitle="Latest customer purchases"
            />

            <div className="space-y-4">

                {ordersData.map((order) => (
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