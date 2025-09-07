"use client";
import { MenuLinks } from "@/data/main/header";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
    const path = usePathname();
    return (
        <div className="flex gap-6 text-foreground text-sm font-medium">
            {MenuLinks.map((link, idx) => (
                <Link
                    key={idx}
                    href={link.url}
                    className={` hover:text-foreground transition-colors duration-500 ease-in-out ${
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
