import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // fetch all tags with blog count
        const tagsWithCount = await prisma.tags.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: { blogtags: true },
                },
            },
            orderBy: {
                blogtags: {
                    _count: "desc", // 👈 correct Prisma syntax
                },
            },
        });

        const data = tagsWithCount.map((tag) => ({
            tag_name: tag.name,
            count: tag._count.blogtags,
        }));

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch blogs per tag" },
            { status: 500 }
        );
    }
}
