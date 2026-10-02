"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { Role } from "@/types/api";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/shared/EmptyState";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoleGateProps {
  allowedRoles: Role[];
  children: ReactNode;
}

export function RoleGate({ allowedRoles, children }: RoleGateProps) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return null;

  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <EmptyState 
          icon={ShieldAlert}
          title="Access Denied"
          description="You do not have permission to view this page."
          action={<Button onClick={() => router.back()}>Go Back</Button>}
        />
      </div>
    );
  }

  return <>{children}</>;
}
