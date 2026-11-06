import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLiftCard,
} from "@/components/public/MotionWrappers";

const testimonials = [
  {
    name: "Marcus Thorne",
    role: "Ward 4 Resident",
    neighborhood: "Central Avenue",
    issue: "Deep Roadway Pothole",
    quote:
      "Reported a deep pothole that had broken two car suspensions on our street. CityFix dispatched a repair crew in under 24 hours with before/after photo confirmation.",
    time: "Resolved in 28h",
  },
  {
    name: "Dr. Fatima Khan",
    role: "Community Health Director",
    neighborhood: "West Riverfront",
    issue: "Overflowing Stormwater Sump",
    quote:
      "Our intersection was prone to severe monsoon waterlogging. With CityFix, we tracked the drainage suction truck on the GPS map. Truly transparent municipal work.",
    time: "Resolved in 4h",
  },
  {
    name: "David Chen",
    role: "Merchant Guild President",
    neighborhood: "Downtown Market",
    issue: "Commercial Dumpster Clearance",
    quote:
      "The Stripe priority processing option was a lifesaver before our annual street festival. The issue was expedited and cleaned within 4 hours. Extraordinary service.",
    time: "Expedited in 3.5h",
  },
];

export function CitizenTestimonialsSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Community Voices
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Trusted by active citizens across our city
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Real feedback from neighborhood residents holding public departments
            accountable.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <StaggerItem key={idx}>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card space-y-4 h-full shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        ★★★★★
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {t.time}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-xs text-foreground block">
                        {t.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {t.role} &bull; {t.neighborhood}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
