"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoaderCircleIcon } from "lucide-react";
import LoginForm from "./login-form";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGitHubLoading, setIsGitHubLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        // Simulate OAuth flow
        signIn("google", { callbackUrl: "/" });
        setIsGoogleLoading(false);
    };

    const handleGitHubSignIn = async () => {
        setIsGitHubLoading(true);
        // Simulate OAuth flow
        signIn("github", { callbackUrl: "/" });
        setIsGitHubLoading(false);
    };

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
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-12"
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "G"
                            )}
                            Sign in with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-12"
                            onClick={handleGitHubSignIn}
                            disabled={isGitHubLoading}
                        >
                            {isGitHubLoading ? (
                                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "G"
                            )}
                            Sign in with GitHub
                        </Button>
                    </div>

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
