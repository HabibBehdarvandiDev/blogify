import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import HeaderMenu from "./header-menu";
import MobileMenu from "./mobile-menu";
import UserDropdown from "./user-dropdown";

const Header = () => {
    return (
        <div className="px-4 py-6 border-b border-b-[#DDDDDD] dark:border-b-[#333333] flex items-center justify-center w-full">
            <div className="container flex items-center justify-between align-middle">
                <h2 className="flex items-end align-bottom text-foreground font-bold text-xl">
                    Blogify.
                </h2>
                <div className="hidden sm:flex">
                    <HeaderMenu />
                </div>
                <div className="hidden sm:flex gap-2">
                    <AnimatedThemeToggler />
                    <UserDropdown />
                </div>
                <div className="sm:hidden">
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
};

export default Header;
