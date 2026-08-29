"use client";

import CardHeader from "@/components/ui/CardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import OrderItem from "./OrderItem";
import { useLanguage } from "@/providers/LanguageProvider";

const RecentOrders = ({ orders = [] }) => {
    const { language } = useLanguage();
    const isEnglish = language === "en";
    return (
        <DashboardCard className="h-full">

            <CardHeader
                title={isEnglish ? "Recent Orders" : "أحدث الطلبات"}
                subtitle={isEnglish ? "Latest customer purchases" : "أحدث عمليات شراء العملاء"}
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
