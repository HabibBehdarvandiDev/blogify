import Header from "@/components/shared/main/header/header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-w-svw min-h-svh bg-background overflow-x-hidden ">
            <Header />
            {children}
        </div>
    );
};

export default MainLayout;
