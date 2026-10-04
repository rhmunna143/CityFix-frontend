"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { updateProfile, uploadAvatar } from "@/lib/api/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Camera } from "lucide-react";
import { toast } from "sonner";

export function ProfileForm() {
  const { user, fetchUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isUploading, setIsUploading] = useState(false);

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      toast.success("Profile updated successfully");
      fetchUser();
    },
    onError: (err: any) => toast.error(err.message || "Failed to update profile"),
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image too large. Max 2MB.");
    }
    
    setIsUploading(true);
    try {
      const { url } = await uploadAvatar(file);
      await profileMutation.mutateAsync({ avatarUrl: url });
      toast.success("Avatar uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    profileMutation.mutate({ name, phone });
  };

  if (!user) return null;

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 rounded-full bg-muted overflow-hidden border flex items-center justify-center shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-muted-foreground">{user.name?.charAt(0)}</span>
            )}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
              {isUploading ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : <Camera className="h-6 w-6 text-white" />}
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={isUploading} />
            </label>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block mt-2">
              {user.role}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1234567890" />
          </div>
          <Button 
            onClick={handleSave} 
            disabled={profileMutation.isPending || (name === user.name && phone === (user.phone || ""))}
            className="w-full sm:w-auto"
          >
            {profileMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
