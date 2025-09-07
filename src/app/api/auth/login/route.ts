import { LoginFormSchema } from "@/schemas/auth/login";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid JSON body" },
            { status: 400 }
        );
    }

    try {
        const validation = LoginFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: validation.error.issues,
                },
                { status: 422 }
            );
        }

        const { email, password } = validation.data;

        // Fetch user + accounts
        const user = await prisma.users.findUnique({
            where: { email },
            include: { userrole: { include: { role: true } }, accounts: true },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Check if password is missing (OAuth-only user)
        if (!user.password || user.password.trim() === "") {
            // Determine available OAuth providers
            return NextResponse.json(
                {
                    message:
                        "This account is linked via OAuth. Please login using:Google/GitHub",
                },
                { status: 403 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            message: "Login successful",
            user: userWithoutPassword,
        });
    } catch (error: any) {
        console.error("Error logging in user:", error);

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
