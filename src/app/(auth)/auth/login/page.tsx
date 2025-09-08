"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import OauthButtons from "../oauth-buttons";
import LoginForm from "./login-form";

export default function LoginPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your email and password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* OAuth Buttons */}
                    <OauthButtons />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-gray-500">
                                or
                            </span>
                        </div>
                    </div>

                    <LoginForm />

                    <div className="text-center">
                        <span className="text-sm text-gray-600">
                            Didn&apos;t registered?{" "}
                        </span>
                        <Link
                            href="/auth/register"
                            className="text-sm font-medium"
                        >
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
