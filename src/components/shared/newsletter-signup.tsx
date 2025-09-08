"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSignup() {
    const [email, setEmail] = useState("");

    const handleNewsletterSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter signup
        toast.success("Subscribed successfully! we contact you soon.");
        setEmail("");
    };

    return (
        <div className="mt-20 p-10 lg:p-12 bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 max-w-lg mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6 p-4 bg-secondary/70 rounded-full w-16 h-16 mx-auto">
                <Mail className="h-8 w-8 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Stay Updated
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Get the latest articles and writing tips delivered to your inbox
                weekly.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-6">
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-input border-2 border-border/50 focus:border-primary h-14 text-lg px-6 rounded-xl"
                />
                <Button type="submit" className="w-full py-5">
                    <Mail className="mr-3 h-5 w-5" />
                    Subscribe Now
                </Button>
            </form>
        </div>
    );
}
