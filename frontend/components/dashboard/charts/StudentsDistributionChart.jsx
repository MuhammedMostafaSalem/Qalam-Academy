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
import { useLanguage } from "@/providers/LanguageProvider";

const StudentsDistributionChart = ({ data = [] }) => {
    const { language } = useLanguage();
    const isEnglish = language === "en";
    return (
        <DashboardCard className="h-full">
            <CardHeader
                title={isEnglish ? "Student Distribution" : "توزيع الطلاب"}
                subtitle={isEnglish ? "Students enrolled in each course" : "عدد الطلاب المسجلين في كل دورة"}
                filter
                filterLabel={isEnglish ? "All Courses" : "جميع الدورات"}
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
                                    suffix={isEnglish ? " students" : " طالب"}
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
                                        fill="var(--color-primary)"
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
