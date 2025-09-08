"use client";

import * as React from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";

type BlogLike = {
    title: string;
    likes: number;
};

const chartConfig = {
    likes: { label: "Likes", color: "var(--chart-2)" },
} satisfies ChartConfig;

export const BlogLikesChart = () => {
    const [data, setData] = React.useState<BlogLike[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("/api/stats/blog-likes");
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <p>Loading chart...</p>;

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Likes per Blog</CardTitle>
                    <CardDescription>
                        Number of likes for each blog (last 50 blogs)
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    className="aspect-auto h-[250px] w-full"
                    config={chartConfig}
                >
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="title"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={10}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(val) => val}
                                    indicator="dot"
                                />
                            }
                        />
                        <Bar dataKey="likes" fill="var(--chart-2)" />
                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
