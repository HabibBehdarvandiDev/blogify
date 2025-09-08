import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Count blogs by status
        const publishedCount = await prisma.blogs.count({
            where: { status: "published" },
        });

        const draftCount = await prisma.blogs.count({
            where: { status: "draft" },
        });

        return NextResponse.json({
            data: [
                { status: "Published", count: publishedCount },
                { status: "Draft", count: draftCount },
            ],
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch blog status data" },
            { status: 500 }
        );
    }
}
