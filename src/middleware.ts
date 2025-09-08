import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your protected routes
const ADMIN_ROUTES = ["/admin"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip public files, API routes, _next, etc.
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Get JWT token from next-auth
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If no token and trying to access protected routes, redirect to login
    if (!token) {
        if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
            const signInUrl = new URL("/auth/login", req.url);
            signInUrl.searchParams.set("callbackUrl", pathname); // redirect after login
            return NextResponse.redirect(signInUrl);
        }
        return NextResponse.next();
    }

    // User is authenticated
    const roles: string[] = (token as any)?.roles || [];

    // Check admin routes
    if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
        if (!roles.includes("admin")) {
            // Non-admin users trying to access admin page
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
    matcher: ["/admin/:path*", "/blogs/:path*"], // adjust as needed
};
