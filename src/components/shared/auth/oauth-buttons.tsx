"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const OauthButtons = () => {
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
                    <Image
                        src={
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                        }
                        alt="google logo"
                        width={25}
                        height={25}
                    />
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
                    <Image
                        src={
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
                        }
                        alt="google logo"
                        className="dark:invert"
                        width={25}
                        height={25}
                    />
                )}
                Sign in with GitHub
            </Button>
        </div>
    );
};

export default OauthButtons;
