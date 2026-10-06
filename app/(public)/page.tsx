import { Metadata } from "next";
import { 
  HomeHero, 
  HomeStatsStrip, 
  LiveMunicipalPulse,
  HowItWorksSection, 
  BeforeAfterShowcase,
  HomeServicesGrid, 
  DepartmentEfficiencyLeaderboard,
  CitizenTestimonialsSection,
  MobileAppExperienceSection,
  HomeFaqSection,
  HomeCtaBanner 
} from "@/components/public/HomeSections";

export const metadata: Metadata = {
  title: "CityFix - Modern Municipal Issue Reporting & Civic Action Platform",
  description: "Report municipal problems, track real-time department progress with guaranteed SLA timers, and improve your neighborhood with CityFix.",
  openGraph: {
    title: "CityFix - Modern Municipal Civic Action Platform",
    description: "Empowering citizens and municipal departments to fix civic issues with SLA accountability.",
    type: "website",
  },
};

interface PublicStats {
  totalResolved: number;
  avgResolutionHours: number;
  perCategoryCounts?: Record<string, number>;
}

async function getPublicStats(): Promise<PublicStats | null> {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
    const res = await fetch(`${baseUrl}/public/stats`, {
      next: { revalidate: 30 },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const stats = await getPublicStats();

  const totalResolved = stats?.totalResolved ?? 2;
  const avgHours = stats?.avgResolutionHours ? Math.round(stats.avgResolutionHours) : 48;

  return (
    <div className="flex flex-col w-full">
      <HomeHero />
      <HomeStatsStrip totalResolved={totalResolved} avgHours={avgHours} />
      <LiveMunicipalPulse />
      <HowItWorksSection />
      <BeforeAfterShowcase />
      <HomeServicesGrid />
      <DepartmentEfficiencyLeaderboard />
      <CitizenTestimonialsSection />
      <MobileAppExperienceSection />
      <HomeFaqSection />
      <HomeCtaBanner />
    </div>
  );
}
