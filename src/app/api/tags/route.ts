import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { tagSchema } from "@/schemas/tags";

export async function GET(req: NextRequest) {
    try {
        const tags = await prisma.tags.findMany();
        if (tags.length === 0) {
            return NextResponse.json(
                { message: "No tags found yet!" },
                { status: 404 }
            );
        }
        return NextResponse.json(tags, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch tags" },
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

    const validation = tagSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { errors: validation.error.issues },
            { status: 400 }
        );
    }

    const { name, description } = validation.data;

    // tag exists check
    try {
        const existingTag = await prisma.tags.findUnique({
            where: { name },
        });
        if (existingTag) {
            return NextResponse.json(
                { error: "Tag with this name already exists" },
                { status: 409 }
            );
        }
    } catch {
        return NextResponse.json(
            { error: "Failed to check existing tags" },
            { status: 500 }
        );
    }

    try {
        const newTag = await prisma.tags.create({
            data: { name, description },
        });
        return NextResponse.json(newTag, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to create tag" },
            { status: 500 }
        );
    }
}
