"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ChartBlogStatusSkeleton = () => (
  <Card className="pt-0 animate-pulse">
    <CardHeader className="flex flex-col gap-1 border-b py-5">
      <Skeleton className="h-6 w-48" />      {/* CardTitle */}
      <Skeleton className="h-4 w-64" />      {/* CardDescription */}
    </CardHeader>
    <CardContent className="px-2 sm:px-6 sm:pt-6">
      <Skeleton className="h-[250px] w-full rounded-md" /> {/* Pie chart area */}
    </CardContent>
  </Card>
);

export default ChartBlogStatusSkeleton;
