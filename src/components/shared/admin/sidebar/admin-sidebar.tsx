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
                        {/* Dashboard */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/admin">
                                    <LayoutDashboard className="mr-2 size-4" />
                                    Dashboard
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* Blogs with submenu */}
                        <Collapsible defaultOpen>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <FileText className="mr-2 size-4" />
                                        Manage Blogs
                                        <ChevronRight className="ml-auto size-4 data-[state=open]:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/blogs">
                                                    <List className="mr-2 size-4" />{" "}
                                                    All Blogs
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/blogs/create">
                                                    <Plus className="mr-2 size-4" />{" "}
                                                    Create
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/blogs/comments">
                                                    <MessageSquare className="mr-2 size-4" />{" "}
                                                    Comments
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                        {/* Tags */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/tags">
                                    <Tags className="mr-2 size-4" />
                                    Manage Tags
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* Users with submenu */}
                        <Collapsible>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <Users className="mr-2 size-4" />
                                        Manage Users
                                        <ChevronRight className="ml-auto size-4 data-[state=open]:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/users">
                                                    <List className="mr-2 size-4" />{" "}
                                                    All Users
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                        {/* Analytics */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/analytics">
                                    <BarChart className="mr-2 size-4" />
                                    Analytics
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
};

export default AdminSidebar;
