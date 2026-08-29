"use client";

import CardHeader from "@/components/ui/CardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useLanguage } from "@/providers/LanguageProvider";

const SalesChart = ({ data = [] }) => {
    const { language } = useLanguage();
    const isEnglish = language === "en";
    return (
        <DashboardCard className="h-full">
            <CardHeader
                title={isEnglish ? "Sales" : "المبيعات"}
                subtitle={isEnglish ? "Monthly order count" : "عدد الطلبات الشهري"}
                filter
                filterLabel={isEnglish ? "This Year" : "هذا العام"}
            />

            <div className="h-[340px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 4"
                            opacity={0.15}
                        />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            cursor={false}
                            content={<CustomTooltip suffix={isEnglish ? " orders" : " طلب"} prefix="" />}
                        />

                        <Bar
                            dataKey="sales"
                            radius={[10, 10, 0, 0]}
                            barSize={22}
                            fill="var(--color-primary)"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
};

export default SalesChart;
