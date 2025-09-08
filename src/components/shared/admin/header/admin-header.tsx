import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import HeaderBreadCrumb from "./header-breadcrumb";
import UserDropdown from "../../main/header/user-dropdown";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const AdminHeader = () => {
    return (
        <header className="w-full min-h-16 border-b border-b-[#DDDDDD] dark:border-b-[#333333] flex items-center px-4">
            <div className="w-full flex items-center justify-between align-middle ">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <HeaderBreadCrumb />
                </div>
                <div className="flex items-center gap-4">
                    <AnimatedThemeToggler />
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
