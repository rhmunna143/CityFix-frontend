"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useComplaintWizard } from "@/lib/stores/complaintWizard";
import { createComplaint, uploadAttachment } from "@/lib/api/complaints";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, MapPin, UploadCloud, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { Category } from "@/types/api";

const STEPS = ["Category", "Details", "Location", "Evidence", "Review"];

export default function NewComplaintWizard() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  const state = useComplaintWizard();
  const { categoryId, title, description, address, latitude, longitude, images, updateField, reset } = state;

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/proxy/categories");
      const data = await res.json();
      return data.data as Category[];
    }
  });

  const handleNext = () => {
    // Validation
    if (step === 0 && !categoryId) return toast.error("Please select a category");
    if (step === 1 && (!title || !description)) return toast.error("Please enter a title and description");
    if (step === 2 && (!address || address.length < 5)) return toast.error("Please enter a valid address (min 5 chars)");

    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const selectedCategory = categories?.find(c => c.id === categoryId);
      if (!selectedCategory) throw new Error("Invalid category");

      // 1. Create Complaint
      const payload = {
        categoryId,
        departmentId: selectedCategory.departmentId,
        title,
        description,
        latitude: latitude || 0,
        longitude: longitude || 0,
        address
      };
      const complaint = await createComplaint(payload);

      // 2. Upload Images Sequentially
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        await uploadAttachment(complaint.id, file, "BEFORE", (progress) => {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        });
      }

      toast.success("Complaint submitted successfully!");
      reset();

      // If payment required
      if (selectedCategory.basePrice && parseFloat(selectedCategory.basePrice) > 0) {
        toast.info("Payment required for this service. Redirecting to complaint details.");
      }
      router.push(`/dashboard/complaints/${complaint.id}`);

    } catch (err: any) {
      toast.error(err.message || "Failed to submit complaint");
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(f => f.size <= 4 * 1024 * 1024);
      if (validFiles.length < filesArray.length) {
        toast.error("Some files were too large. Max 4MB per image.");
      }
      updateField("images", [...images, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    updateField("images", newImages);
  };

  const selectedCat = categories?.find(c => c.id === categoryId);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader title="New Complaint" description="Report an issue to the city" />

      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}></div>
        {STEPS.map((label, idx) => (
          <div key={label} className={`flex flex-col items-center bg-background px-2 ${idx <= step ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${idx <= step ? 'border-primary bg-primary text-primary-foreground' : 'border-muted bg-background'}`}>
              {idx < step ? <CheckCircle className="h-4 w-4" /> : idx + 1}
            </div>
            <span className="text-xs font-medium mt-2">{label}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[step]}</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <div className="space-y-4">
              {categoriesLoading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories?.map((c) => (
                    <div
                      key={c.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${categoryId === c.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                      onClick={() => updateField("categoryId", c.id)}
                    >
                      <h4 className="font-semibold">{c.name}</h4>
                      {c.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.description}</p>}
                      <div className="mt-4 flex gap-2 flex-wrap">
                        <span className="text-xs bg-muted px-2 py-1 rounded">SLA: {c.slaHours}h</span>
                        {c.basePrice && parseFloat(c.basePrice) > 0 && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Fee: ${parseFloat(c.basePrice).toFixed(2)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Brief summary of the issue" value={title} onChange={(e) => updateField("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Provide detailed information..." className="h-32" value={description} onChange={(e) => updateField("description", e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Address (Required)</Label>
                <Input placeholder="E.g., 123 Main St, CityCenter" value={address} onChange={(e) => updateField("address", e.target.value)} />
              </div>
              <div className="space-y-2 pt-4">
                <Label>GPS Coordinates (Optional)</Label>
                <div className="flex gap-4">
                  <Input type="number" placeholder="Latitude" value={latitude || ""} onChange={(e) => updateField("latitude", parseFloat(e.target.value))} />
                  <Input type="number" placeholder="Longitude" value={longitude || ""} onChange={(e) => updateField("longitude", parseFloat(e.target.value))} />
                </div>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                  if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        updateField("latitude", pos.coords.latitude);
                        updateField("longitude", pos.coords.longitude);
                        toast.success("Location found");
                      },
                      () => toast.error("Could not get location")
                    );
                  }
                }}>
                  <MapPin className="mr-2 h-4 w-4" /> Use Current Location
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                <Input type="file" multiple accept="image/*" className="hidden" id="file-upload" onChange={handleFileChange} />
                <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                  <span className="font-semibold text-lg">Click to upload images</span>
                  <span className="text-sm text-muted-foreground mt-1">PNG, JPG up to 4MB each</span>
                </Label>
              </div>

              {images.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-sm">Selected Files ({images.length})</h4>
                  <div className="grid gap-2">
                    {images.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-muted/30 p-2 rounded border text-sm">
                        <span className="truncate max-w-[250px]">{file.name}</span>
                        <div className="flex items-center gap-4">
                          {uploadProgress[file.name] !== undefined && <span className="text-xs text-primary">{uploadProgress[file.name]}%</span>}
                          <Button variant="ghost" size="sm" className="text-destructive h-6 w-6 p-0" onClick={() => removeFile(i)}>✕</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg space-y-4">
                <div><span className="text-muted-foreground text-sm">Category:</span> <span className="font-medium ml-2">{selectedCat?.name}</span></div>
                <div><span className="text-muted-foreground text-sm">Title:</span> <span className="font-medium ml-2">{title}</span></div>
                <div><span className="text-muted-foreground text-sm">Location:</span> <span className="font-medium ml-2">{address}</span></div>
                <div><span className="text-muted-foreground text-sm">Evidence:</span> <span className="font-medium ml-2">{images.length} files attached</span></div>

                {selectedCat?.basePrice && parseFloat(selectedCat.basePrice) > 0 && (
                  <div className="bg-amber-100 text-amber-800 p-3 rounded text-sm mt-4">
                    <strong>Note:</strong> This category requires a mandatory service charge of ${parseFloat(selectedCat.basePrice).toFixed(2)}. You will be prompted to pay after submission.
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={handleBack} disabled={step === 0 || isSubmitting}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Complaint
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
