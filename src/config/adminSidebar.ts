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
            { title: "All Blogs", href: "/admin/dashboard/blogs", icon: List },
            {
                title: "Create",
                href: "/admin/dashboard/blogs/create",
                icon: Plus,
            },
        ],
    },
    /* {
        title: "Comments",
        icon: MessageSquare,
        href: "/admin/dashboard/comments",
    }, */
    {
        title: "Manage Tags",
        icon: Tags,
        href: "/admin/dashboard/tags",
    },
    /* {
        title: "Manage Users",
        icon: Users,
        children: [
            { title: "All Users", href: "/admin/dashboard/users", icon: List },
        ],
    },
    {
        title: "Analytics",
        icon: BarChart,
        href: "/admin/dashboard/analytics",
    }, */
];
