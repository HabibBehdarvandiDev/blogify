"use client";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <SessionProvider>{children}</SessionProvider>
            </ThemeProvider>
        </>
    );
};

export default Providers;
