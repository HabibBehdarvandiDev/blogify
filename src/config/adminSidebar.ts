import {
  LayoutDashboard,
  FileText,
  List,
  Plus,
  MessageSquare,
  Tags,
  Users,
  BarChart,
} from "lucide-react"

export const adminSidebarConfig = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Manage Blogs",
    icon: FileText,
    children: [
      { title: "All Blogs", href: "/blogs", icon: List },
      { title: "Create", href: "/blogs/create", icon: Plus },
      { title: "Comments", href: "/blogs/comments", icon: MessageSquare },
    ],
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
]
