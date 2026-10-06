"use client";

import { useState } from "react";
import { ContactForm } from "@/components/public/ContactForm";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  HoverLiftCard, 
  FloatingBadge 
} from "@/components/public/MotionWrappers";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How do I track the progress of my reported issue?",
    a: "Every reported issue receives a unique reference code (e.g. REF-12345). You can log in to your Citizen Dashboard at any time to see the live status (SUBMITTED, ASSIGNED, IN PROGRESS, RESOLVED, or CLOSED), assigned technician notes, and remaining SLA countdown clock.",
  },
  {
    q: "What happens if a department breaches its SLA deadline?",
    a: "If an issue is not resolved within its published SLA window, our automated SLA watchdog flags the ticket with an SLA Breached badge and triggers high-priority escalation notifications to department directors and city supervisors.",
  },
  {
    q: "How does priority payment processing work?",
    a: "For select non-emergency categories or expedited service, citizens can optionally pay a priority fee using Stripe test cards. Priority fees adjust the SLA deadline with an expedited turnaround multiplier and bump the ticket to the top of the technician queue.",
  },
  {
    q: "Can I reopen an issue if it was not resolved satisfactorily?",
    a: "Yes! If a complaint was marked RESOLVED or CLOSED but the field condition remains defective, you can click 'Reopen Complaint' from your dashboard to return the issue to the departmental queue with additional feedback.",
  },
  {
    q: "Who can see my reported issue?",
    a: "Public complaints and resolution milestones appear on the municipal transparency log to hold departments publicly accountable. Your personal contact details and payment records remain private and secured.",
  },
];

export function ContactClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-16 w-full">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <FadeIn direction="down" duration={0.4}>
          <FloatingBadge className="inline-flex">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Citizen Operations & Support
            </div>
          </FloatingBadge>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.5}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Contact Municipal{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Operations Desk
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.5}>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Need assistance with an existing ticket, have questions about municipal services, or wish to report feedback? Reach out using the form below or contact our city helplines.
          </p>
        </FadeIn>
      </div>

      {/* Main Grid: Form + Quick Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Quick Contact Information Column */}
        <div className="lg:col-span-5 space-y-6">
          <FadeIn direction="left" delay={0.2}>
            <div className="rounded-2xl border bg-card p-6 md:p-7 space-y-5 shadow-xs">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Emergency & Quick Helplines
              </h3>

              <div className="space-y-3.5 text-sm">
                <HoverLiftCard>
                  <div className="p-4 rounded-xl bg-muted/30 border space-y-1 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase font-bold text-primary tracking-wider">
                        Municipal Helpline
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                        Toll-Free
                      </span>
                    </div>
                    <span className="font-mono text-lg font-bold text-foreground block">
                      311 / +1 (800) 555-CITY
                    </span>
                    <p className="text-xs text-muted-foreground">Available Mon–Fri, 8:00 AM – 5:00 PM EST</p>
                  </div>
                </HoverLiftCard>

                <HoverLiftCard>
                  <div className="p-4 rounded-xl bg-muted/30 border space-y-1 hover:border-primary/40 transition-colors">
                    <span className="text-[11px] uppercase font-bold text-primary tracking-wider block">
                      Email Operations Desk
                    </span>
                    <span className="font-semibold text-foreground block">
                      support@cityfix.local
                    </span>
                    <p className="text-xs text-muted-foreground">Typical response time: under 4 business hours</p>
                  </div>
                </HoverLiftCard>

                <HoverLiftCard>
                  <div className="p-4 rounded-xl bg-muted/30 border space-y-1 hover:border-primary/40 transition-colors">
                    <span className="text-[11px] uppercase font-bold text-primary tracking-wider block">
                      Central City Operations
                    </span>
                    <span className="font-semibold text-foreground block">
                      City Hall, 100 Municipal Way
                    </span>
                    <p className="text-xs text-muted-foreground">Civic Center Zone 1 &bull; Walk-in desk open 9am-4pm</p>
                  </div>
                </HoverLiftCard>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Frequently Asked Questions with Animated Accordion */}
      <div className="space-y-6 pt-6 border-t">
        <FadeIn className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Quick answers to common questions about CityFix and municipal resolution workflows.
          </p>
        </FadeIn>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl border bg-card/80 backdrop-blur-xs overflow-hidden shadow-xs hover:border-primary/30 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base text-foreground tracking-tight">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
