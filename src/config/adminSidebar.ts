import {
    LayoutDashboard,
    FileText,
    List,
    Plus,
    MessageSquare,
    Tags,
    Users,
    BarChart,
} from "lucide-react";

export const adminSidebarConfig = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        title: "Manage Blogs",
        icon: FileText,
        children: [
            { title: "All Blogs", href: "/admin/blogs", icon: List },
            { title: "Create", href: "/admin/blogs/create", icon: Plus },
        ],
    },
    {
        title: "Comments",
        icon: MessageSquare,
        href: "/admin/comments",
    },
    {
        title: "Manage Tags",
        icon: Tags,
        href: "/tags",
    },
    {
        title: "Manage Users",
        icon: Users,
        children: [{ title: "All Users", href: "/users", icon: List }],
    },
    {
        title: "Analytics",
        icon: BarChart,
        href: "/analytics",
    },
];
