import { PageHeader } from "@/components/shared/PageHeader";
import { ProfileForm } from "@/components/shared/ProfileForm";

export default function StaffProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Staff Profile" 
        description="Manage your staff account and details."
      />
      <ProfileForm />
    </div>
  );
}
