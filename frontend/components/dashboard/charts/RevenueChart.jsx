"use client";

import CardHeader from "@/components/ui/CardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useLanguage } from "@/providers/LanguageProvider";

const RevenueChart = ({ data = [] }) => {
    const { language } = useLanguage();
    const isEnglish = language === "en";
    // Format revenue values for tooltip
    const formattedData = data.map(item => ({
        ...item,
        revenue: item.revenue || 0
    }));

    return (
        <DashboardCard className="h-full">
            <CardHeader
                title={isEnglish ? "Revenue" : "الإيرادات"}
                subtitle={isEnglish ? "Monthly revenue analysis" : "تحليل الإيرادات الشهرية"}
                filter
                filterLabel={isEnglish ? "This Year" : "هذا العام"}
            />

            <div className="h-[340px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart
                        data={formattedData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="revenueGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-primary)"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="var(--color-primary)"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 4"
                            opacity={0.15}
                        />

                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            width={60}
                            tickMargin={25}
                            tickFormatter={(value) => `${value / 1000}${isEnglish ? "K" : " ألف"}`}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip
                            content={<CustomTooltip prefix="" suffix={isEnglish ? " EGP" : " ج.م"} />}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            fill="url(#revenueGradient)"
                            activeDot={{
                                r: 6,
                                strokeWidth: 3,
                                fill: "var(--color-primary)",
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
};

export default RevenueChart
