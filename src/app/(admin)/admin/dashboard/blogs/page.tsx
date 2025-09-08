import prisma from "@/lib/db";
import BlogManagement from "./blog-management";
import { Suspense } from "react";
import DashboardBlogsSkeleton from "@/components/shared/skeletons/dashboard-blogs-skeleton";

const DashboardBlogsPage = async () => {
    const blogs = await prisma.blogs.findMany({
        select: {
            id: true,
            title: true,
            summary: true,
            thumbnail_url: true,
            content: true,
            status: true,
            author_id: true,
            createdAt: true,
            updatedAt: true,
            _count: { select: { bloglikes: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    // reshape response
    const result = blogs.map((blog) => ({
        ...blog,
        likes_count: blog._count.bloglikes,
    }));

    return (
        <div className="flex flex-col w-full">
            <Suspense fallback={<DashboardBlogsSkeleton />}>
                <BlogManagement blogs={result} />
            </Suspense>
        </div>
    );
};

export default DashboardBlogsPage;
