import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    // user must be logged in
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blogId = params.id;
    const userId = session.user.id;

    try {
        // check if already liked
        const existing = await prisma.bloglikes.findUnique({
            where: {
                blog_id_user_id: {
                    blog_id: blogId,
                    user_id: userId,
                },
            },
        });

        let updatedBlog;

        if (existing) {
            // remove like
            await prisma.bloglikes.delete({
                where: {
                    blog_id_user_id: {
                        blog_id: blogId,
                        user_id: userId,
                    },
                },
            });

            updatedBlog = await prisma.blogs.update({
                where: { id: blogId },
                data: {
                    likes_count: {
                        decrement: 1,
                    },
                },
                select: {
                    id: true,
                    likes_count: true,
                },
            });

            return NextResponse.json({ liked: false, ...updatedBlog });
        } else {
            // add like
            await prisma.bloglikes.create({
                data: {
                    blog_id: blogId,
                    user_id: userId,
                },
            });

            updatedBlog = await prisma.blogs.update({
                where: { id: blogId },
                data: {
                    likes_count: {
                        increment: 1,
                    },
                },
                select: {
                    id: true,
                    likes_count: true,
                },
            });

            return NextResponse.json({ liked: true, ...updatedBlog });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
