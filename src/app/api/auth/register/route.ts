import prisma from "@/lib/db";
import { RegisterFormSchema } from "@/schemas/auth/register";
import bcrypt from "bcryptjs"; // or argon2
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = RegisterFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: validation.error.issues,
                },
                { status: 422 }
            );
        }

        const { name, email, password } = validation.data;

        const hashedPassword = await bcrypt.hash(password, 12);

        let userRole = await prisma.role.findUnique({
            where: { name: "user" },
        });

        if (!userRole) {
            userRole = await prisma.role.create({
                data: {
                    name: "user",
                    description: "Default role for new users",
                },
            });
        }

        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            await tx.userrole.create({
                data: {
                    user_id: user.id,
                    role_id: userRole!.id,
                },
            });

            return user;
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error registering user:", error);

        if (error.code === "P2002") {
            // Prisma unique constraint error
            return NextResponse.json(
                { message: "Email already in use" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
