"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function SingleBlogPageSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Navigation */}
            <section className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-9 w-20 rounded-md" />
                            <Skeleton className="h-9 w-20 rounded-md" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <article className="space-y-8">
                    {/* Title & Summary */}
                    <header className="text-center space-y-6">
                        <Skeleton className="h-10 w-3/4 mx-auto" />
                        <Skeleton className="h-6 w-2/3 mx-auto" />

                        {/* Meta */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </header>

                    {/* Thumbnail */}
                    <Skeleton className="w-full h-[400px] md:h-[500px] rounded-xl" />

                    {/* Content */}
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6" />
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-4/5" />
                    </div>

                    {/* Footer */}
                    <footer className="pt-8 border-t border-border">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <Skeleton className="h-9 w-20 rounded-md" />
                                <Skeleton className="h-9 w-20 rounded-md" />
                            </div>
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </footer>
                </article>

                {/* Author Section */}
                <Card className="mt-12 p-8 bg-muted/50">
                    <div className="flex items-start gap-6">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <div className="flex gap-3">
                                <Skeleton className="h-9 w-20 rounded-md" />
                                <Skeleton className="h-9 w-20 rounded-md" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Back Button */}
                <div className="mt-12 flex justify-center">
                    <Button
                        variant="outline"
                        className="gap-2 bg-transparent"
                        disabled
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
