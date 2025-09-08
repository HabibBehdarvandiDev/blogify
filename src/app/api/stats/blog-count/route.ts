import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blogs = await prisma.blogs.groupBy({
            by: ["createdAt"],
            _count: { id: true },
            orderBy: { createdAt: "asc" },
        });

        // Format date to yyyy-mm-dd
        const formatted = blogs.map((b) => ({
            date: b.createdAt!.toISOString().split("T")[0],
            count: b._count.id,
        }));

        return NextResponse.json(formatted, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch blog counts" },
            { status: 500 }
        );
    }
}
