import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blogs = await prisma.blogs.findMany({
            select: { id: true, title: true },
        });

        const commentsCount = await Promise.all(
            blogs.map(async (b) => {
                const count = await prisma.comments.count({
                    where: { blog_id: b.id },
                });
                return { id: b.id, title: b.title, comments: count };
            })
        );

        return NextResponse.json(commentsCount);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch blog comments" },
            { status: 500 }
        );
    }
}
