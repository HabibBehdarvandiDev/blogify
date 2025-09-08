import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blogs = await prisma.blogs.findMany({
            select: { id: true, title: true, likes_count: true },
            orderBy: { likes_count: "desc" },
            take: 20, // top 20 blogs
        });

        return NextResponse.json(blogs);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch blog likes" },
            { status: 500 }
        );
    }
}
