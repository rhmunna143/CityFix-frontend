import { Metadata } from "next";
import { TransparencyClient } from "@/components/public/TransparencyClient";

export const metadata: Metadata = {
  title: "Public Transparency & Civic SLA Metrics - CityFix",
  description: "View open municipal performance data, resolution times, departmental accountability, and SLA compliance on CityFix.",
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

async function getTransparencyData(): Promise<{ stats: PublicStats | null; categories: any[] }> {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
    const [statsRes, catRes] = await Promise.all([
      fetch(`${baseUrl}/public/stats`, { cache: "no-store" }),
      fetch(`${baseUrl}/categories`, { cache: "no-store" }),
    ]);

    const statsJson = statsRes.ok ? await statsRes.json() : { data: null };
    const catJson = catRes.ok ? await catRes.json() : { data: [] };

    const categories = Array.isArray(catJson.data) ? catJson.data : catJson.data?.items || [];
    return { stats: statsJson.data, categories };
  } catch {
    return { stats: null, categories: [] };
  }
}

export default async function TransparencyPage() {
  const { stats, categories } = await getTransparencyData();

  const totalResolved = stats?.totalResolved ?? 2;
  const avgHours = stats?.avgResolutionHours ? Math.round(stats.avgResolutionHours) : 48;
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
