import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  type StateStorage,
} from "zustand/middleware";

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

let timer: ReturnType<typeof setTimeout> | undefined;
let pending: [string, string] | null = null;
const flush = () => {
  if (pending && typeof window !== "undefined") {
    try {
      localStorage.setItem(...pending);
    } catch {
      // ignore storage quota errors
    }
    pending = null;
  }
};

const debouncedStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name, value) => {
    pending = [name, value];
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, 400);
  },
  removeItem: (name) => {
    pending = null;
    if (timer) clearTimeout(timer);
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
};

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flush);
  window.addEventListener("beforeunload", flush);
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

      updateField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
      reset: () =>
        set({
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
      storage: createJSONStorage(() => debouncedStorage),
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
