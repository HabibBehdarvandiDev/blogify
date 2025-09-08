"use client";
import Link from "next/link";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, CalendarIcon } from "lucide-react";
import { Blog } from "@/types/admin/blogs";
import { formatDate } from "@/lib/utils";

type Props = {
    blog: Blog;
};

const TableBlogRow = ({ blog }: Props) => {
    return (
        <TableRow key={blog.id}>
            <TableCell className="font-medium flex flex-col items-start gap-2">
                <Link
                    href={`/admin/dashboard/blogs/${blog.id}`}
                    className="text-foreground"
                >
                    {blog.title}
                </Link>
                <p className="text-xs text-muted-foreground">{blog.summary}</p>
            </TableCell>

            <TableCell>
                {blog.status === "published" ? (
                    <Badge variant="outline">Published</Badge>
                ) : (
                    <Badge>Draft</Badge>
                )}
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-1 align-middle">
                    <HeartIcon className="w-4 h-4 text-destructive" />
                    {blog.likes_count}
                </div>
            </TableCell>

            <TableCell className="text-muted-foreground">
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                {formatDate(blog.createdAt)}
            </TableCell>

            <TableCell className="text-muted-foreground">
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                {formatDate(blog.updatedAt)}
            </TableCell>

        </TableRow>
    );
};

export default TableBlogRow;
