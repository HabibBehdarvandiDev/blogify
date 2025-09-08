import prisma from "@/lib/db";
import { BlogFormSchema } from "@/schemas/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const blogs = await prisma.blogs.findMany({
            where: {
                status: "published",
            },
            include: {
                blogtags: {
                    include: { tags: true },
                },
                bloglikes: true,
            },
            orderBy: { createdAt: "desc" },
        });

        if (blogs.length === 0) {
            return NextResponse.json(
                { message: "No blogs found yet!" },
                { status: 404 }
            );
        }

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const validation = BlogFormSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { errors: validation.error.issues },
            { status: 400 }
        );
    }

    const { title, summary, thumbnail_url, content, author_id, status, tags } =
        validation.data;

    const defaultThumbnail = "https://via.placeholder.com/600x400";

    try {
        const author = await prisma.users.findUnique({
            where: { id: author_id },
            include: {
                userrole: {
                    include: { role: true },
                },
            },
        });

        if (!author) {
            return NextResponse.json(
                { error: "Author not found" },
                { status: 404 }
            );
        }

        const isAdmin = author.userrole.some(
            (ur) => ur.role.name.toLowerCase() === "admin"
        );

        if (!isAdmin) {
            return NextResponse.json(
                { error: "User is not authorized to create blogs" },
                { status: 403 }
            );
        }

        // ✅ Step 2: Check for duplicate title
        const existingBlog = await prisma.blogs.findUnique({
            where: { title },
        });
        if (existingBlog) {
            return NextResponse.json(
                { error: "A blog with this title already exists" },
                { status: 409 }
            );
        }

        // ✅ Step 3: Transaction: Create blog + tags
        const result = await prisma.$transaction(async (tx) => {
            const newBlog = await tx.blogs.create({
                data: {
                    title,
                    summary,
                    thumbnail_url: thumbnail_url || defaultThumbnail,
                    content,
                    author_id,
                    status,
                    likes_count: 0,
                },
            });

            if (tags && tags.length > 0) {
                const foundTags = await tx.tags.findMany({
                    where: { id: { in: tags } },
                });

                if (foundTags.length !== tags.length) {
                    throw new Error("One or more tags not found");
                }

                await tx.blogtags.createMany({
                    data: tags.map((tagId) => ({
                        blog_id: newBlog.id,
                        tag_id: tagId,
                    })),
                    skipDuplicates: true,
                });
            }

            return tx.blogs.findUnique({
                where: { id: newBlog.id },
                include: {
                    blogtags: { include: { tags: true } },
                    bloglikes: true,
                },
            });
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        if (error.message.includes("tags not found")) {
            return NextResponse.json(
                { error: "Some tags do not exist" },
                { status: 400 }
            );
        }

        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Duplicate blog title" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create blog" },
            { status: 500 }
        );
    }
}
