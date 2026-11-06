import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn, FloatingBadge } from "@/components/public/MotionWrappers";
import { HeroIncidentShowcase } from "./HeroIncidentShowcase";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-radial from-primary/10 via-background to-background py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-0 border-b">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-29 items-center">
          {/* Left Column: Headline and CTAs - Server Rendered */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <FadeIn eager direction="down" duration={0.4}>
              <FloatingBadge className="inline-flex">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Next-Gen Civic Infrastructure
                </div>
              </FloatingBadge>
            </FadeIn>

            <FadeIn eager delay={0.1} duration={0.5}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Smarter cities start with{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  faster resolutions.
                </span>
              </h1>
            </FadeIn>

            <FadeIn eager delay={0.2} duration={0.5}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Report road damage, sanitation issues, drainage blocks, or water
                leaks in 60 seconds. Track real-time department progress with
                guaranteed SLA countdowns.
              </p>
            </FadeIn>

            <FadeIn eager delay={0.3} duration={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/login?next=/dashboard/complaints/new"
                  className={`${buttonVariants({ size: "lg" })} h-12 px-7 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer gap-2 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Report an Issue Now</span>
                </Link>

                <Link
                  href="/services"
                  className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-6 text-base cursor-pointer gap-2 w-full sm:w-auto hover:bg-muted/70 transition-all`}
                >
                  <span>Explore City Services</span>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            {/* Trust Indicators */}
            <FadeIn eager delay={0.4} duration={0.5}>
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg
                    className="h-4 w-4 text-emerald-500 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Real-time SLA Timers
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <svg
                    className="h-4 w-4 text-emerald-500 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  GPS Map Pinpointing
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <svg
                    className="h-4 w-4 text-emerald-500 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Full Public Audit Trail
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Interactive Client Island */}
          <HeroIncidentShowcase />
        </div>
      </div>
    </section>
  );
}
