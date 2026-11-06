import { PageHeader } from "@/components/shared/PageHeader";
import { ProfileForm } from "@/components/shared/ProfileForm";
import { AdminPrivilegesCard } from "@/components/admin/AdminPrivilegesCard";

export default function AdminProfilePage() {
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
          <AdminPrivilegesCard />
        </div>
      </div>
    </div>
  );
}
