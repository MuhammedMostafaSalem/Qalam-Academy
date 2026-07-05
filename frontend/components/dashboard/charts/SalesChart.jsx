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
import salesData from "./salesData";
import CustomTooltip from "./CustomTooltip";

const SalesChart = () => {
    return (
        <DashboardCard className="h-full">
            <CardHeader
                title="Sales"
                subtitle="Monthly Sales"
                filter
                filterLabel="This Year"
            />

            <div className="h-[340px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={salesData}
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
                            content={<CustomTooltip suffix="%" prefix="" />}
                        />

                        <Bar
                            dataKey="sales"
                            radius={[10, 10, 0, 0]}
                            barSize={22}
                            fill="#4F46E5"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
};

export default SalesChart;