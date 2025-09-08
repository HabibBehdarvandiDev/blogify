"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import BlogLikesChartSkeleton from "../../skeletons/blog-likes-chart-skeleton";

type AuthorData = {
    author_name: string;
    count: number;
};

const chartConfig = {
    blogs: { label: "Blogs", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function BlogsPerAuthorChart() {
    const [data, setData] = useState<AuthorData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/stats/blogs-per-author");
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <BlogLikesChartSkeleton />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Authors</CardTitle>
                <CardDescription>Number of blogs per author</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="author_name" />
                            <YAxis />
                            <Tooltip
                                content={
                                    <ChartTooltipContent indicator="dot" />
                                }
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="count" fill="var(--chart-1)" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
