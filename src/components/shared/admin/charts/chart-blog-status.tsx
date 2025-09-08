"use client";

import * as React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart";

type BlogStatusData = {
    status: string;
    count: number;
};

const COLORS = ["#4ade80", "#facc15"]; // green for published, yellow for draft

const chartConfig = {
    published: { label: "Published", color: "var(--chart-1)" },
    draft: { label: "Draft", color: "var(--chart-2)" },
} satisfies ChartConfig;

export const ChartBlogStatus = () => {
    const [data, setData] = React.useState<BlogStatusData[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/stats/blogs-by-status");
                const json = await res.json();
                setData(json.data);
            } catch (err) {
                console.error("Failed to fetch blog status data", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading chart...</p>;

    return (
        <Card className="pt-0">
            <CardHeader className="flex flex-col gap-1 border-b py-5">
                <CardTitle>Blog Status Distribution</CardTitle>
                <CardDescription>
                    Shows the number of blogs by status (Published vs Draft)
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 sm:pt-6">
                <ChartContainer
                    className="h-[250px] w-full"
                    config={chartConfig}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label={(entry) =>
                                    `${entry.status} (${entry.count})`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
