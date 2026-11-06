import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLiftCard,
} from "@/components/public/MotionWrappers";

const steps = [
  {
    step: 1,
    title: "1. File with Evidence",
    description:
      "Take a photo, drop a pin on the GPS map, and select the issue category. Your ticket is registered with a unique reference code instantly.",
    badge: "60-Second Report",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "2. Department Assignment",
    description:
      "The responsible city department dispatches the assignment to a verified municipal technician with an automatic SLA clock running.",
    badge: "Automated Dispatch",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "3. Resolution & Proof",
    description:
      "Field technicians upload resolution notes and photographic proof upon completion. Citizens verify the work and rate the service.",
    badge: "Citizen Verified",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Simple & Transparent
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How CityFix resolves municipal complaints
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            A modern, digitized workflow replacing bureaucratic paperwork with
            real-time accountability.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <StaggerItem key={s.step}>
              <HoverLiftCard className="h-full">
                <div className="relative h-full rounded-2xl border bg-card p-7 space-y-4 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shadow-xs">
                        {s.icon}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/50 text-xs font-semibold text-primary flex items-center gap-1">
                    <span>Phase 0{s.step}</span>
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
