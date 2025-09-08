"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogLikesChartSkeleton = () => (
  <Card className="pt-0 animate-pulse">
    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div className="grid flex-1 gap-1">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-60" />
      </div>
    </CardHeader>
    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
      <Skeleton className="h-[250px] w-full rounded-md" />
    </CardContent>
  </Card>
);

export default BlogLikesChartSkeleton;
