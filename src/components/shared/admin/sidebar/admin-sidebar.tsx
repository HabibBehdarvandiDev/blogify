import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { adminSidebarConfig } from "@/config/adminSidebar";
import {
    BarChart,
    BoldIcon,
    ChevronRight,
    FileText,
    LayoutDashboard,
    List,
    MessageSquare,
    Plus,
    Tags,
    Users,
} from "lucide-react";

import Link from "next/link";

const AdminSidebar = async () => {
    return (
        <Sidebar>
            <SidebarHeader className="p-4 text-lg">
                <div className="flex items-center gap-2">
                    <div className="rounded-sm bg-primary/10 p-2">
                        <BoldIcon className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h5 className="text-lg font-bold">Blogify.</h5>
                        <p className="text-xs truncate w-34">
                            My own blog platform
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {adminSidebarConfig.map((item, idx) =>
                            item.children ? (
                                <Collapsible
                                    key={idx}
                                    defaultOpen={item.title === "Manage Blogs"}
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <item.icon className="mr-2 size-4" />
                                                {item.title}
                                                <ChevronRight className="ml-auto size-4 data-[state=open]:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.children.map(
                                                    (sub, subIdx) => (
                                                        <SidebarMenuSubItem
                                                            key={subIdx}
                                                        >
                                                            <SidebarMenuSubButton
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        sub.href
                                                                    }
                                                                >
                                                                    <sub.icon className="mr-2 size-4" />
                                                                    {sub.title}
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={idx}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href}>
                                            <item.icon className="mr-2 size-4" />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
};

export default AdminSidebar;
