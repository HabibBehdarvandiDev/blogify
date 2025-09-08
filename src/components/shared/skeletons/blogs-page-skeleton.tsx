import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogsPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-12">
                {/* Stats Section */}
                <div className="mb-12 text-center">
                    <Skeleton className="h-10 w-80 mx-auto mb-4" />
                    <Skeleton className="h-6 w-2/3 mx-auto mb-6" />
                    <div className="flex justify-center items-center gap-8">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-border overflow-hidden bg-card"
                        >
                            {/* Image */}
                            <Skeleton className="w-full aspect-video" />

                            {/* Content */}
                            <div className="p-6 space-y-3">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />

                                {/* Meta Info */}
                                <div className="flex justify-between mt-4">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-20" />
                                </div>

                                <Skeleton className="h-9 w-full rounded-md mt-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Section */}
                <div className="text-center mt-16">
                    <Skeleton className="h-5 w-64 mx-auto mb-6" />
                    <Button variant="outline" size="lg" disabled>
                        <Skeleton className="h-6 w-40" />
                    </Button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-card border-t border-border mt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Left section */}
                        <div className="md:col-span-2 space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-80" />
                            <div className="flex gap-4">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>

                        {/* Links */}
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>

                        {/* Categories */}
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>

                    <div className="border-t border-border my-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <Skeleton className="h-4 w-40" />
                        <div className="flex gap-6">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogsPageSkeleton;
