import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import CreateBlogForm from "./create-blog-form";
import prisma from "@/lib/db";
const CreateBlogPage = async () => {
    const tags = await prisma.tags.findMany();
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-foreground">
                            Create New Blog
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Fill in the details below to create a new blog post
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <CreateBlogForm tags={tags} />
            </CardContent>
        </Card>
    );
};

export default CreateBlogPage;
