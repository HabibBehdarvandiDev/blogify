import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    // tag exists check
    try {
        const existingTag = await prisma.tags.findUnique({
            where: { id: params.id },
        });
        if (!existingTag) {
            return NextResponse.json(
                { error: "Tag not found" },
                { status: 404 }
            );
        }
        await prisma.tags.delete({
            where: { id: params.id },
        });
        return NextResponse.json(
            { message: "Tag deleted successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Failed to delete tag" },
            { status: 500 }
        );
    }
}
