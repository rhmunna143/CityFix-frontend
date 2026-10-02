import { ReactNode, Suspense } from "react";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { LayoutDashboard, PlusCircle, CreditCard, Bell, User as UserIcon } from "lucide-react";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { title: "New Complaint", href: "/dashboard/complaints/new", icon: <PlusCircle className="h-4 w-4" /> },
  { title: "Payments", href: "/dashboard/payments", icon: <CreditCard className="h-4 w-4" /> },
  { title: "Notifications", href: "/dashboard/notifications", icon: <Bell className="h-4 w-4" /> },
  { title: "Profile", href: "/dashboard/profile", icon: <UserIcon className="h-4 w-4" /> },
];

export default function CitizenLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell navItems={navItems}>
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
        {children}
      </Suspense>
    </DashboardShell>
  );
}
