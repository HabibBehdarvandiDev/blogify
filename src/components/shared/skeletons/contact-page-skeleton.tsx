import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ContactPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Skeleton className="h-10 w-40 mx-auto mb-4" />
                        <Skeleton className="h-6 w-2/3 mx-auto" />
                    </div>

                    {/* Contact Form Skeleton */}
                    <div className="border border-border rounded-lg p-8 space-y-6">
                        {/* Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-28 w-full rounded-md" />
                        </div>

                        {/* Button */}
                        <Skeleton className="h-12 w-full rounded-md" />
                    </div>

                    {/* Contact Info Skeleton */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-5 w-20 mx-auto" />
                                <Skeleton className="h-4 w-32 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPageSkeleton;
