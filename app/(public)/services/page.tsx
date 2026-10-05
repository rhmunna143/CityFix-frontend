import { Metadata } from "next";
import { ServicesCatalog } from "@/components/public/ServicesCatalog";
import { Department, Category } from "@/types/api";

export const metadata: Metadata = {
  title: "Municipal Services & Categories - CityFix",
  description: "Browse all civic services, response times, SLA targets, and service fees managed by CityFix municipal departments.",
  openGraph: {
    title: "City Services Directory - CityFix",
    description: "Browse municipal departments and problem categories with guaranteed SLA turnaround times.",
  },
};

async function getServicesData(): Promise<{ departments: Department[]; categories: Category[] }> {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
    const [deptRes, catRes] = await Promise.all([
      fetch(`${baseUrl}/departments`, { cache: "no-store" }),
      fetch(`${baseUrl}/categories`, { cache: "no-store" }),
    ]);

    const deptsJson = deptRes.ok ? await deptRes.json() : { data: [] };
    const catsJson = catRes.ok ? await catRes.json() : { data: [] };

    const departments: Department[] = Array.isArray(deptsJson.data) ? deptsJson.data : deptsJson.data?.items || [];
    const categories: Category[] = Array.isArray(catsJson.data) ? catsJson.data : catsJson.data?.items || [];

    return { departments, categories };
  } catch {
    return { departments: [], categories: [] };
  }
}

export default async function ServicesPage() {
  const { departments, categories } = await getServicesData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 w-full">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          Official Municipal Directory
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          City Services & Issue Categories
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Explore all active municipal departments, standard turnaround SLAs, and priority resolution options. Every category is backed by real-time tracking and automated department dispatch.
        </p>
      </div>

      {/* Catalog Component */}
      <ServicesCatalog departments={departments} categories={categories} />

      {/* SLA Policy Note */}
      <div className="rounded-2xl border bg-muted/20 p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          How Service Level Agreements (SLAs) Work
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Each category has an established target resolution window (e.g., 24 hours for roadside drainage, 48–50 hours for potholes). When a citizen files a complaint, the SLA clock begins immediately upon department assignment. If an issue is not resolved within the target timeframe, it is automatically marked as <strong className="text-destructive">SLA Breached</strong> and escalated directly to departmental supervisors.
        </p>
      </div>
    </div>
  );
}
