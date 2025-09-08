import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { BlogUpdateSchema } from "@/schemas/blogs";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    try {
        const blog = await prisma.blogs.findUnique({
            where: { id },
            include: {
                blogtags: {
                    include: { tags: true },
                },
                bloglikes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(blog, { status: 200 });
    } catch (error: any) {
        console.error("GET /blogs/:id error:", error);

        // Handle Prisma known errors
        if (error.code === "P2023") {
            return NextResponse.json(
                { error: "Invalid blog ID format" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }
    try {
        const deletedBlog = await prisma.blogs.delete({
            where: { id },
            include: {
                blogtags: {
                    include: { tags: true },
                },
                bloglikes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return NextResponse.json(
            { message: "blog deleted!", deletedBlog },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("DELETE /blogs/:id error:", error);
        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Blog not found or already deleted" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Failed to delete blog" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const validation = BlogUpdateSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { errors: validation.error.issues },
            { status: 400 }
        );
    }

    const {
        title,
        summary,
        thumbnail_url,
        content,
        status,
        tags,
        likes_count,
    } = validation.data;

    try {
        // Check if blog exists
        const existingBlog = await prisma.blogs.findUnique({ where: { id } });
        if (!existingBlog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        // Update blog
        const updatedBlog = await prisma.blogs.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(summary && { summary }),
                ...(thumbnail_url && { thumbnail_url }),
                ...(content && { content }),
                ...(status && { status }),
                ...(likes_count && { likes_count }),
            },
            include: {
                blogtags: { include: { tags: true } },
                bloglikes: true,
                users: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        if (tags && Array.isArray(tags)) {
            // Clear existing tags and reattach
            await prisma.blogtags.deleteMany({ where: { blog_id: id } });

            await prisma.blogtags.createMany({
                data: tags.map((tagId: string) => ({
                    blog_id: id,
                    tag_id: tagId,
                })),
                skipDuplicates: true,
            });
        }

        // Refetch updated blog with new tags
        const finalBlog = await prisma.blogs.findUnique({
            where: { id },
            include: {
                blogtags: { include: { tags: true } },
                bloglikes: true,
                users: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        return NextResponse.json(finalBlog, { status: 200 });
    } catch (error: any) {
        console.error("PUT /blogs/:id error:", error);

        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Duplicate blog title" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Failed to update blog" },
            { status: 500 }
        );
    }
}
