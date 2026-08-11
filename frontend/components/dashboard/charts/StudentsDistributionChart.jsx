"use client"

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

const StudentsDistributionChart = ({ data = [] }) => {
    return (
        <DashboardCard className="h-full">
            <CardHeader
                title="توزيع الطلاب"
                subtitle="عدد الطلاب المسجلين في كل كورس"
                filter
                filterLabel="جميع الكورسات"
            />

            <div className="h-[340px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 10
                        }}
                    >
                        <CartesianGrid
                            horizontal={false}
                            strokeDasharray="3 3"
                            opacity={0.1}
                        />

                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            type="category"
                            dataKey="course"
                            axisLine={false}
                            tickLine={false}
                            width={90}
                            tick={{
                                fontSize: 13,
                            }}
                            tickMargin={55}
                        />

                        <Tooltip
                            cursor={false}
                            content={
                                <CustomTooltip
                                    prefix=""
                                    suffix=" طالب"
                                />
                            }
                        />

                        <Bar
                            dataKey="students"
                            radius={[0, 10, 10, 0]}
                            barSize={18}
                        >
                            {data.map(
                                (_, index) => (
                                    <Cell
                                        key={index}
                                        fill="#4F46E5"
                                    />
                                )
                            )}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
};

export default StudentsDistributionChart;