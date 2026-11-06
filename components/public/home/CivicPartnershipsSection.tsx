import Image from "next/image";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLiftCard,
} from "@/components/public/MotionWrappers";

const leaders = [
  {
    name: "Elena Rostova",
    role: "Ward 4 Infrastructure Chair",
    district: "North Central District",
    quote:
      "CityFix has eliminated the backlog of unattended potholes in Ward 4. The guaranteed SLA timers give our council true departmental accountability.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Eng. Tariq Rahman",
    role: "Chief Municipal Works Director",
    district: "Metropolitan Engineering",
    quote:
      "Our field technicians love the mobile photographic workflow. Work is dispatched clearly, verified on site, and recorded permanently.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Aisha Patel",
    role: "Urban Health Coalition Lead",
    district: "Public Sanitation Board",
    quote:
      "Commercial waste overflows are now sanitized in hours rather than weeks. The public health improvements in our marketplace areas are undeniable.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marcus Vance",
    role: "Transit & Road Safety Alliance",
    district: "Municipal Safety Division",
    quote:
      "Rapid roadside repairs prevent rim damage, traffic jams, and pedestrian hazards. Every city in our nation should adopt this modern platform.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
];

export function CivicPartnershipsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/20 border-b px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Institutional Backing
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Endorsed by Municipal Leaders & Ward Councils
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Elected officials and department heads united in modernizing public
            works governance.
          </p>
        </FadeIn>

        {/* Leaders Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((lead, idx) => (
            <StaggerItem key={idx}>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card space-y-4 h-full shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
                        <Image
                          src={lead.image}
                          alt={lead.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">
                          {lead.name}
                        </h4>
                        <span className="text-[11px] text-primary font-semibold block">
                          {lead.role}
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          {lead.district}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      &ldquo;{lead.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Verified Leader
                    </span>
                    <span className="font-mono">Civic Partner</span>
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
