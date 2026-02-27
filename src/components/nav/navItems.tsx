import { type ReactNode } from "react";
import { House, Monitor, User } from "lucide-react";

export interface NavItem {
    icon: ReactNode;
    label: string;
    sub: string;
    path?: string;
}

export const navItems: NavItem[] = [
    {
        icon: <House className="w-5 h-5" />,
        label: "Overview",
        sub: "Main dashboard",
        path: "/dashboard",
    },
    {
        icon: <Monitor className="w-5 h-5" />,
        label: "Projects",
        sub: "Active frames",
        path: "/projects",
    },
    {
        icon: <User className="w-5 h-5" />,
        label: "Users",
        sub: "Team directory",
        path: "/users",
    },
];
