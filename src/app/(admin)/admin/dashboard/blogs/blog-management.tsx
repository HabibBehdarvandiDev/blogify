"use client";
import BlogFilters from "@/components/shared/admin/blogs/blog-filters";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { mockBlogs } from "@/config/blogConfig";
import { useBlogFilters } from "@/hooks/use-blog-filters";
import { FilterIcon, PlusIcon } from "lucide-react";
import BlogPagination from "./blog-pagination";
import BlogTable from "./blog-table";

const BlogManagement = ({ blogs }) => {
    const {
        search,
        setSearch,
        status,
        setStatus,
        time,
        setTime,
        page,
        setPage,
        filteredBlogs,
        currentBlogs,
        totalPages,
        clearFilters,
    } = useBlogFilters(blogs, 5);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-foreground">
                            Blog Management
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Create, edit, and manage your blog posts
                        </p>
                    </div>

                    <Button>
                        <PlusIcon className="mr-1 h-4 w-4" /> Create Blog
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <BlogFilters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    time={time}
                    setTime={setTime}
                    clearFilters={clearFilters}
                />

                <div className="flex gap-1 my-4">
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                        <FilterIcon className="w-4 h-4" />
                        Showing {currentBlogs.length} of {filteredBlogs.length}{" "}
                        blogs
                    </p>
                </div>

                <BlogTable
                    currentBlogs={currentBlogs}
                    filteredCount={filteredBlogs.length}
                />
            </CardContent>

            <CardFooter className="flex items-center justify-between">
                <BlogPagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                />
            </CardFooter>
        </Card>
    );
};

export default BlogManagement;
