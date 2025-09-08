import AdminHeader from "@/components/shared/admin/header/admin-header";
import AdminSidebar from "@/components/shared/admin/sidebar/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="h-screen w-full transition-all duration-300 ease-in-out">
                <AdminHeader />
                <section className="p-4">{children}</section>
            </main>
        </SidebarProvider>
    );
};

export default AdminLayout;
