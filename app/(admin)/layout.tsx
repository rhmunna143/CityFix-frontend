import { ReactNode } from "react";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BarChart3, Users, Building, Tag, Shield, Inbox } from "lucide-react";

const navItems = [
  { title: "Analytics", href: "/admin", icon: <BarChart3 className="h-4 w-4" /> },
  { title: "Complaints", href: "/admin/complaints", icon: <Inbox className="h-4 w-4" /> },
  { title: "Users", href: "/admin/users", icon: <Users className="h-4 w-4" /> },
  { title: "Departments", href: "/admin/departments", icon: <Building className="h-4 w-4" /> },
  { title: "Categories", href: "/admin/categories", icon: <Tag className="h-4 w-4" /> },
  { title: "Audit Logs", href: "/admin/audit-logs", icon: <Shield className="h-4 w-4" /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <DashboardShell navItems={navItems}>{children}</DashboardShell>;
}
