"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    CalendarIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    HeartIcon,
    PencilIcon,
    Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Blog } from "@/types/admin/blogs";
import { Card } from "@/components/ui/card";

type Props = {
    currentBlogs: Blog[];
    filteredCount: number;
};

const BlogTable = ({ currentBlogs, filteredCount }: Props) => {
    return (
        <Card className="p-0 border border-[#DDDDDD] dark:border-[#333333]">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Likes</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentBlogs.map((blog) => (
                        <TableRow key={blog.id}>
                            <TableCell className="font-medium flex flex-col items-start gap-2">
                                <Link
                                    href={`/admin/dashboard/blogs/${blog.id}`}
                                    className="text-foreground"
                                >
                                    {blog.title}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                    {blog.summary}
                                </p>
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

                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <EllipsisVerticalIcon />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <EyeIcon className="w-4 h-4" /> View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <PencilIcon className="w-4 h-4" />{" "}
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                            <Trash2Icon className="w-4 h-4" />{" "}
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}

                    {currentBlogs.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6">
                                No blogs found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default BlogTable;
