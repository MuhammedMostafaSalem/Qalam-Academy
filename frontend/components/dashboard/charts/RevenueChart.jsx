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
import revenueData from "./revenueData";
import CustomTooltip from "./CustomTooltip";

const RevenueChart = () => {
    return (
        <DashboardCard className="h-full">
            <CardHeader
                title="Revenue"
                subtitle="Revenue Analytics"
                filter
                filterLabel="This Year"
            />

            <div className="h-[340px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart
                        data={revenueData}
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
                                    stopColor="#4F46E5"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#4F46E5"
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
                            tickFormatter={(value) => `$${value / 1000}k`}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip
                            content={<CustomTooltip prefix="$" />}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            fill="url(#revenueGradient)"
                            activeDot={{
                                r: 6,
                                strokeWidth: 3,
                                fill: "#4F46E5",
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
};

export default RevenueChart