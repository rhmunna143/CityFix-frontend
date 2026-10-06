import { Metadata } from "next";
import { AboutClient } from "@/components/public/AboutClient";

export const metadata: Metadata = {
  title: "About CityFix - Municipal Innovation & Civic Mission",
  description: "Learn how CityFix transforms municipal problem solving with digital accountability, real-time SLA tracking, and citizen engagement.",
  openGraph: {
    title: "About CityFix - Modern Civic Infrastructure",
    description: "Empowering citizens and municipal teams with digital accountability and SLA transparency.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      <AboutClient />
    </div>
  );
}