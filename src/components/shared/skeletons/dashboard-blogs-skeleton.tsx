"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardBlogsSkeleton() {
    return (
        <div className="flex flex-col w-full space-y-4">
            {/* Mimic multiple blog rows */}
            {Array.from({ length: 5 }).map((_, idx) => (
                <Card key={idx} className="w-full animate-pulse">
                    <CardHeader>
                        <Skeleton className="h-5 w-1/3 rounded-md" />{" "}
                        {/* Title */}
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />{" "}
                        {/* Summary */}
                        <Skeleton className="h-4 w-3/4 rounded-md" />{" "}
                        {/* Partial content */}
                        <div className="flex gap-2 mt-2">
                            <Skeleton className="h-6 w-16 rounded-md" />{" "}
                            {/* Status */}
                            <Skeleton className="h-6 w-12 rounded-md" />{" "}
                            {/* Likes */}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
