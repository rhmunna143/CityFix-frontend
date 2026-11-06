import { Metadata } from "next";
import {
  HomeHero,
  HomeStatsStrip,
  LiveMunicipalPulse,
  CinematicMunicipalShowcase,
  HowItWorksSection,
  InteractiveProblemSimulator,
  BeforeAfterShowcase,
  SmartCityGridSection,
  HomeServicesGrid,
  DepartmentEfficiencyLeaderboard,
  EnvironmentalImpactSection,
  CitizenTestimonialsSection,
  CivicPartnershipsSection,
  MobileAppExperienceSection,
  HomeFaqSection,
  HomeCtaBanner,
} from "@/components/public/home";
import { serverFetch } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "CityFix - Modern Municipal Issue Reporting & Civic Action Platform",
  description:
    "Report municipal problems, track real-time department progress with guaranteed SLA timers, and improve your neighborhood with CityFix.",
  openGraph: {
    title: "CityFix - Modern Municipal Civic Action Platform",
    description:
      "Empowering citizens and municipal departments to fix civic issues with SLA accountability.",
    type: "website",
  },
};

interface PublicStats {
  totalResolved: number;
  avgResolutionHours: number;
  perCategoryCounts?: Record<string, number>;
}

export default async function HomePage() {
  const stats = await serverFetch<PublicStats>("/public/stats", {
    revalidate: 60,
  });

  const totalResolved = stats?.totalResolved ?? 2;
  const avgHours = stats?.avgResolutionHours
    ? Math.round(stats.avgResolutionHours)
    : 48;

  return (
    <div className="flex flex-col w-full">
      <HomeHero />
      <HomeStatsStrip totalResolved={totalResolved} avgHours={avgHours} />
      <LiveMunicipalPulse />
      <CinematicMunicipalShowcase />
      <HowItWorksSection />
      <InteractiveProblemSimulator />
      <BeforeAfterShowcase />
      <SmartCityGridSection />
      <HomeServicesGrid />
      <DepartmentEfficiencyLeaderboard />
      <EnvironmentalImpactSection />
      <CitizenTestimonialsSection />
      <CivicPartnershipsSection />
      <MobileAppExperienceSection />
      <HomeFaqSection />
      <HomeCtaBanner />
    </div>
  );
}
