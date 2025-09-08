import React from "react";
import prisma from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import TagsTable from "./tags-table";
import CreateTagModal from "./create-tag-modal";

const TagsPage = async () => {
    const tags = await prisma.tags.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Tags Management</h1>
                <CreateTagModal />
            </div>
            <div className="w-full flex gap-2">
                <Card className="overflow-x-auto w-full p-0">
                    <TagsTable tags={tags} />
                </Card>
            </div>
        </div>
    );
};

export default TagsPage;
