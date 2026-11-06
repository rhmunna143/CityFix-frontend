import { Metadata } from "next";
import { TransparencyClient } from "@/components/public/TransparencyClient";
import { serverFetch } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Public Transparency & Civic SLA Metrics - CityFix",
  description:
    "View open municipal performance data, resolution times, departmental accountability, and SLA compliance on CityFix.",
  openGraph: {
    title: "CityFix Public Transparency Portal",
    description: "Open municipal performance data and SLA compliance metrics.",
  },
};

interface PublicStats {
  totalResolved: number;
  avgResolutionHours: number;
  perCategoryCounts?: Record<string, number>;
}

interface CategoryItem {
  id: string;
  name: string;
  slaHours?: number;
  department?: {
    name?: string;
  };
}

export default async function TransparencyPage() {
  const [stats, categoriesData] = await Promise.all([
    serverFetch<PublicStats>("/public/stats", { revalidate: 60 }),
    serverFetch<CategoryItem[] | { items: CategoryItem[] }>("/categories", {
      revalidate: 300,
      tags: ["catalog"],
    }),
  ]);

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.items || [];

  const totalResolved = stats?.totalResolved ?? 2;
  const avgHours = stats?.avgResolutionHours
    ? Math.round(stats.avgResolutionHours)
    : 48;
  const categoryCounts = stats?.perCategoryCounts || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      <TransparencyClient
        totalResolved={totalResolved}
        avgHours={avgHours}
        categories={categories}
        categoryCounts={categoryCounts}
      />
    </div>
  );
}
