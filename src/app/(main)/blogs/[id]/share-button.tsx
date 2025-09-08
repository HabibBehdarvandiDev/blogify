"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ShareButton() {
    const pathname = usePathname();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            const fullUrl = `${window.location.origin}${pathname}`;
            await navigator.clipboard.writeText(fullUrl);

            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
                <Check className="h-4 w-4 mr-2 text-green-500" />
            ) : (
                <Share2 className="h-4 w-4 mr-2" />
            )}
            {copied ? "Copied!" : "Share"}
        </Button>
    );
}
