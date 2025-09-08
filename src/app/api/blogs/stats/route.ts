import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const data = await prisma.blogs.groupBy({
        by: ["createdAt"],
        where: { status: "published" },
        _count: { id: true },
    });

    // format to YYYY-MM-DD
    const formatted = data.map((d) => ({
        date: d.createdAt!.toISOString().split("T")[0],
        count: d._count.id,
    }));

    return NextResponse.json(formatted, { status: 200 });
}
