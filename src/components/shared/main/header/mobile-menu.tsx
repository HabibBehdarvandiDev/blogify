"use client";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MenuLinks } from "@/data/main/header";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
    const path = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <MenuIcon className="text-foreground w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-[300px] border-l border-l-[#DDDDDD] dark:border-l-[#333333]"
            >
                <SheetHeader className="border-b border-b-[#DDDDDD] dark:border-b-[#333333] mb-4 p-4">
                    <SheetTitle className="font-bold">Blogify</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col flex-1 px-4 gap-3">
                    {MenuLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.url}
                            className={` hover:text-foreground transition-colors duration-500 ease-in-out py-3 px-2 rounded-sm ${
                                path === link.url
                                    ? "text-foreground bg-accent"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <SheetFooter className="border-t border-t-[#DDDDDD] dark:border-t-[#333333] mt-4">
                    <AnimatedThemeToggler />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
