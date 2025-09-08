import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MainPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-background px-4">
            {/* Hero Section Skeleton */}
            <section className="py-24 lg:py-32 container mx-auto text-center">
                <Skeleton className="h-10 w-40 mx-auto mb-6" />
                <Skeleton className="h-16 w-2/3 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
                <div className="flex justify-center gap-6 mt-8">
                    <Skeleton className="h-12 w-32 rounded-md" />
                    <Skeleton className="h-12 w-32 rounded-md" />
                </div>
            </section>

            {/* Latest Blogs Section */}
            <section className="py-24 lg:py-32 px-4 bg-gradient-to-b from-background to-card/30">
                <div className="container mx-auto max-w-7xl">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <Skeleton className="h-8 w-40 mx-auto mb-6" />
                        <Skeleton className="h-12 w-80 mx-auto mb-4" />
                        <Skeleton className="h-6 w-2/3 mx-auto" />
                    </div>

                    {/* Featured Article Card */}
                    <div className="mb-16">
                        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden md:flex">
                            <Skeleton className="md:w-1/2 w-full h-80" />
                            <div className="md:w-1/2 p-10 lg:p-12 space-y-4">
                                <div className="flex gap-4">
                                    <Skeleton className="h-6 w-20 rounded-md" />
                                    <Skeleton className="h-6 w-24 rounded-md" />
                                </div>
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-5/6" />
                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex gap-6">
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                    <Skeleton className="h-10 w-28 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Grid */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden"
                            >
                                <Skeleton className="w-full aspect-video" />
                                <div className="p-8 space-y-4">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-6 w-full" />
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <Skeleton className="h-5 w-20" />
                                            <Skeleton className="h-5 w-20" />
                                        </div>
                                        <Skeleton className="h-8 w-24 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-16">
                        <Button variant="outline" size="lg" disabled>
                            <Skeleton className="h-6 w-40" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Register CTA Section */}
            <section className="py-24 text-center">
                <Skeleton className="h-12 w-80 mx-auto mb-6" />
                <Skeleton className="h-6 w-2/3 mx-auto mb-6" />
                <div className="flex justify-center gap-6">
                    <Skeleton className="h-12 w-32 rounded-md" />
                    <Skeleton className="h-12 w-32 rounded-md" />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-card border-t border-border mt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2 space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-80" />
                            <div className="flex gap-4">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
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

export default MainPageSkeleton;
