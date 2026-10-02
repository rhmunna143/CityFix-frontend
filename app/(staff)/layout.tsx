import { ReactNode } from "react";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Inbox, BarChart, User as UserIcon } from "lucide-react";

const navItems = [
  { title: "Assigned Queue", href: "/staff", icon: <Inbox className="h-4 w-4" /> },
  { title: "Performance", href: "/staff/performance", icon: <BarChart className="h-4 w-4" /> },
  { title: "Profile", href: "/staff/profile", icon: <UserIcon className="h-4 w-4" /> },
];

export default function StaffLayout({ children }: { children: ReactNode }) {
  return <DashboardShell navItems={navItems}>{children}</DashboardShell>;
}
