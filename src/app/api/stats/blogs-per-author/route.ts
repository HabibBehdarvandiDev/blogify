import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // fetch blogs grouped by author with author name
        const result = await prisma.blogs.groupBy({
            by: ["author_id"],
            _count: { id: true },
            orderBy: { _count: { id: "desc" } },
        });

        // fetch author names in batch
        const authorIds = result.map(r => r.author_id);
        const authors = await prisma.users.findMany({
            where: { id: { in: authorIds } },
            select: { id: true, name: true },
        });

        const authorMap = Object.fromEntries(authors.map(a => [a.id, a.name || "Unknown"]));

        return NextResponse.json(
            result.map(r => ({
                author_name: authorMap[r.author_id],
                count: r._count.id,
            }))
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch blogs per author" },
            { status: 500 }
        );
    }
}
