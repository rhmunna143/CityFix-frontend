import { PageHeader } from "@/components/shared/PageHeader";
import { ProfileForm } from "@/components/shared/ProfileForm";

export default function CitizenProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Profile" 
        description="Manage your account settings and personal information."
      />
      <ProfileForm />
    </div>
  );
}
