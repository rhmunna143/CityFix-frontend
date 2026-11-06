import Link from "next/link";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLiftCard,
} from "@/components/public/MotionWrappers";

const services = [
  {
    title: "Roads & Transport",
    description:
      "Potholes, broken asphalt, damaged pavements, and street signage maintenance.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Waste & Sanitation",
    description:
      "Garbage accumulation, illegal dumping, dumpster overflows, and public cleanups.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    color:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Drainage & Water",
    description:
      "Blocked roadside drains, waterlogging, leaking mains, and sewage overflow.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color:
      "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Restoration & Safety",
    description:
      "Dangerous tree branches, pest infestation, property restorations, and hazardous structures.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
      </svg>
    ),
    color:
      "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

export function HomeServicesGrid() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <FadeIn className="space-y-2">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
              Municipal Services
            </h2>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              Departments ready to serve
            </p>
          </FadeIn>
          <FadeIn direction="left" delay={0.1}>
            <Link
              href="/services"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 cursor-pointer group"
            >
              <span>View all services and categories</span>
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => (
            <StaggerItem key={item.title}>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card space-y-3 h-full shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center border ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-primary">
                    <Link
                      href="/services"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>Explore issues</span>
                      <span>&rarr;</span>
                    </Link>
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
