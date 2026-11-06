import { FadeIn } from "@/components/public/MotionWrappers";

const homeFaqs = [
  {
    q: "Is reporting an issue on CityFix completely free?",
    a: "Yes! Filing standard municipal complaints (potholes, sanitation, water leaks, traffic lights) is completely free for all citizens. Optional priority fees exist only for expedited turnaround processing or special permit requests.",
    defaultOpen: true,
  },
  {
    q: "How do I know my complaint won't be forgotten?",
    a: "Every ticket generates an immutable audit record and an automated SLA countdown timer. Department directors receive automated escalation alerts if any issue is not resolved within its published turnaround deadline.",
  },
  {
    q: "What proof is provided when an issue is fixed?",
    a: "Field technicians must upload photographic proof of completion and detailed resolution notes. You will receive an instant notification and can review, rate, or reopen the ticket if unsatisfied.",
  },
  {
    q: "How does the CityFix Civic AI Assistant help?",
    a: "Our integrated AI Assistant is available 24/7 in the bottom-right corner of the screen to guide you on reporting, suggest the appropriate city department, explain turnaround times, or track ticket status.",
  },
];

export function HomeFaqSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeIn className="text-center space-y-3">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Common Inquiries
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Everything you need to know about municipal reporting and SLA
            accountability.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => (
            <details
              key={idx}
              name="home-faq"
              open={faq.defaultOpen}
              className="group rounded-2xl border bg-card/80 backdrop-blur-xs overflow-hidden shadow-xs hover:border-primary/40 transition-colors"
            >
              <summary className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="font-bold text-base text-foreground tracking-tight">
                  {faq.q}
                </span>
                <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
