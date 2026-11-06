import Image from "next/image";
import { FadeIn, AnimatedCounter } from "@/components/public/MotionWrappers";
import { CivicEcoLeafAnimation } from "@/components/public/CivicLottieVisual";

export function EnvironmentalImpactSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Impact Counters */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <CivicEcoLeafAnimation className="w-4 h-4 rounded-none bg-transparent border-0" />
                  Sustainable Civic Governance
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Preserving Our Environment with Smarter Municipal Action
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Faster issue resolution directly protects urban ecology.
                  Rapidly sealing water main breaks prevents clean aquifer
                  depletion, and prompt waste clearance halts soil and
                  stormwater contamination.
                </p>
              </div>
            </FadeIn>

            {/* Environmental Metric Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl border bg-card/70 space-y-1 shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block">
                  <AnimatedCounter target={1420} suffix="+" />
                </span>
                <span className="text-xs font-bold text-foreground block">
                  Tons of Waste Diverted
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Cleared before reaching natural waterways
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-card/70 space-y-1 shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono block">
                  <AnimatedCounter target={850} suffix="k gal" />
                </span>
                <span className="text-xs font-bold text-foreground block">
                  Clean Water Preserved
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Saved via expedited leak repairs
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-card/70 space-y-1 shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono block">
                  <AnimatedCounter target={43} suffix=" Tons" />
                </span>
                <span className="text-xs font-bold text-foreground block">
                  CO₂ Reduced via Routing
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Fleet dispatch route optimization
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-card/70 space-y-1 shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary font-mono block">
                  <AnimatedCounter target={98} suffix=".4%" />
                </span>
                <span className="text-xs font-bold text-foreground block">
                  Recycled Pavement Reclaim
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Cold-mix asphalt recycling rate
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl h-96 group">
                <Image
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80"
                  alt="Sustainable Urban City Park"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold">
                      CLEAN CITY CHARTER
                    </span>
                    <span className="text-xs text-emerald-300 font-semibold">
                      100% Green Accountability
                    </span>
                  </div>
                  <h4 className="font-bold text-xl leading-snug">
                    Building a cleaner, greener community for generations to
                    come.
                  </h4>
                  <p className="text-xs text-zinc-300">
                    CityFix collaborates with municipal environmental agencies
                    to turn citizen reports into sustainable ecological
                    preservation.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
