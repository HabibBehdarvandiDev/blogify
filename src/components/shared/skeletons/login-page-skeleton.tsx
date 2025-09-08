"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoginPageSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 animate-pulse">
            <Card className="w-full max-w-md">
                {/* Header */}
                <CardHeader className="text-center space-y-2">
                    <Skeleton className="h-8 w-48 mx-auto rounded-md" />{" "}
                    {/* CardTitle */}
                    <Skeleton className="h-4 w-64 mx-auto rounded-md" />{" "}
                    {/* CardDescription */}
                </CardHeader>

                {/* Content */}
                <CardContent className="space-y-6">
                    {/* OAuth buttons */}
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    {/* Separator */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <Skeleton className="h-4 w-10 rounded-md" />
                        </div>
                    </div>
                    {/* Login form */}
                    <Skeleton className="h-10 w-full rounded-md" />{" "}
                    {/* Email */}
                    <Skeleton className="h-10 w-full rounded-md" />{" "}
                    {/* Password */}
                    <Skeleton className="h-10 w-full rounded-md" />{" "}
                    {/* Submit button */}
                    {/* Register link */}
                    <Skeleton className="h-4 w-40 mx-auto rounded-md" />
                </CardContent>
            </Card>
        </div>
    );
}
