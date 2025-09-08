"use client";

import { ShinyButton } from "@/components/magicui/shiny-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserDropdown = () => {
    const { data: session } = useSession();

    if (!session?.user) {
        return (
            <Link href="/auth/register">
                <ShinyButton>Register</ShinyButton>
            </Link>
        );
    }

    const { name, image, email } = session.user;

    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : email?.[0]?.toUpperCase() || "?";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer rounded-sm">
                    <AvatarImage src={image || ""} alt={name || "User"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-sm">
                        <AvatarImage src={image || ""} alt={name || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {name || "Anonymous"}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                            {email}
                        </span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
