"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { tags } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

type Props = {
    tags: tags[];
};

const TagsTable = ({ tags }: Props) => {
    const [tagList, setTagList] = useState(tags);

    async function handleDelete(tagId: string) {
        try {
            const res = await axios.delete(`/api/tags/${tagId}`);

            if (res.status === 200) {
                toast.success("Tag deleted successfully!");
                // ✅ Remove the deleted tag from the UI
                setTagList((prev) => prev.filter((t) => t.id !== tagId));
            } else {
                toast.error("Failed to delete tag. Try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete tag. Try again.");
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tagList.map((tag) => (
                    <TableRow key={tag.id}>
                        <TableCell>{tag.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                            {tag.description}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <EllipsisVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuItem
                                        className="text-destructive cursor-pointer flex items-center gap-2"
                                        onClick={() => handleDelete(tag.id)}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}

                {tagList.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-6">
                            No tags found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TagsTable;
