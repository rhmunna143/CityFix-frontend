import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/public/MotionWrappers";

export function HomeCtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden border-t">
      <div className="absolute inset-0 bg-radial from-primary/10 to-transparent pointer-events-none" />
      <FadeIn className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Make your neighborhood cleaner, safer, and better today.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          It takes less than a minute to file an issue. Every complaint is
          tracked on public record until resolved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/login?next=/dashboard/complaints/new"
            className={`${buttonVariants({ size: "lg" })} h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all`}
          >
            File a Complaint
          </Link>
          <Link
            href="/transparency"
            className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-8 text-base cursor-pointer hover:bg-muted/70 transition-all`}
          >
            View Transparency Portal
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
