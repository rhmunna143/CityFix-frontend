import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WizardState {
  categoryId: string;
  departmentId: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
  images: File[];

  updateField: (field: keyof WizardState, value: any) => void;
  reset: () => void;
}

export const useComplaintWizard = create<WizardState>()(
  persist(
    (set) => ({
      categoryId: "",
      departmentId: "",
      title: "",
      description: "",
      latitude: null,
      longitude: null,
      address: "",
      images: [],

      updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
      reset: () => set({
        categoryId: "",
        departmentId: "",
        title: "",
        description: "",
        latitude: null,
        longitude: null,
        address: "",
        images: [],
      }),
    }),
    {
      name: "complaint-wizard-draft",
      partialize: (state) => ({
        categoryId: state.categoryId,
        departmentId: state.departmentId,
        title: state.title,
        description: state.description,
        latitude: state.latitude,
        longitude: state.longitude,
        address: state.address,
      }),
    }
  )
);
