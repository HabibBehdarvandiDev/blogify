"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import BlogPublishedChartSkeleton from "../../skeletons/blog-published-chart-skeleton";

type BlogCountByDate = {
    date: string; // YYYY-MM-DD
    count: number;
};

const chartConfig = {
    blogs: {
        label: "Published Blogs",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const BlogPublishedChart = () => {
    const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">(
        "90d"
    );
    const [data, setData] = React.useState<BlogCountByDate[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                // 🔹 API endpoint returns blog counts grouped by day
                const res = await axios.get<BlogCountByDate[]>(
                    "/api/stats/blog-published-by-day"
                );
                setData(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load blog stats.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Filter data according to timeRange
    const filteredData = React.useMemo(() => {
        if (!data) return [];
        const referenceDate = new Date(); // today
        let daysToSubtract = 90;
        if (timeRange === "30d") daysToSubtract = 30;
        if (timeRange === "7d") daysToSubtract = 7;

        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);

        return data.filter((item) => new Date(item.date) >= startDate);
    }, [data, timeRange]);

    if (loading) return <BlogPublishedChartSkeleton />;

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Blogs Published</CardTitle>
                    <CardDescription>
                        Number of blogs published per day
                    </CardDescription>
                </div>

                <Select
                    value={timeRange}
                    onValueChange={(val) => setTimeRange(val as any)}
                >
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillBlogs"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-1)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-1)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={20}
                            tickFormatter={(val) => {
                                const date = new Date(val);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(val) =>
                                        new Date(val).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )
                                    }
                                    indicator="dot"
                                />
                            }
                        />

                        <Area
                            dataKey="count"
                            type="natural"
                            fill="url(#fillBlogs)"
                            stroke="var(--chart-1)"
                        />

                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BlogPublishedChart;
