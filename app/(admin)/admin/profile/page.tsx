"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { ProfileForm } from "@/components/shared/ProfileForm";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, Key, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function AdminProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Profile"
        description="Manage your administrator account details, credentials, and system permissions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileForm />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Administrative Privileges & Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-muted-foreground">Assigned Role</span>
                <Badge variant={user?.isSuperAdmin ? "destructive" : "default"}>
                  {user?.role} {user?.isSuperAdmin && "(Super Admin)"}
                </Badge>
              </div>

              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-muted-foreground">Account Status</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {user?.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {user?.createdAt && (
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Member Since
                  </span>
                  <span className="text-xs font-mono">
                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Key className="h-3.5 w-3.5" /> Auth Method
                </span>
                <span className="text-xs font-medium">
                  {user?.googleId ? "Google OAuth" : "Email & Password"}
                </span>
              </div>

              <div className="pt-2">
                <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  System Permissions
                </h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Manage complaints & status transitions
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Assign staff to departmental issues
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Manage users, roles, departments & categories
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Access audit logs & system analytics
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
