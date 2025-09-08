"use client";

import { MenuLinks } from "@/data/main/header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
    const path = usePathname();
    const { data: session } = useSession();

    // Build the menu links dynamically
    const links = [...MenuLinks];
    console.log(JSON.stringify(session?.user));

    // If user has 'admin' role, add Dashboard link
    if (session?.user?.roles[0] === "admin") {
        links.push({
            title: "Dashboard",
            url: "/admin/dashboard",
        });
    }

    return (
        <div className="flex gap-6 text-foreground text-sm font-medium">
            {links.map((link, idx) => (
                <Link
                    key={idx}
                    href={link.url}
                    className={`hover:text-foreground transition-colors duration-500 ease-in-out ${
                        path === link.url
                            ? "text-foreground"
                            : "text-muted-foreground"
                    }`}
                >
                    {link.title}
                </Link>
            ))}
        </div>
    );
};

export default HeaderMenu;
