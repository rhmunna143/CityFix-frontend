import { Metadata } from "next";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Citizen Helpline - CityFix",
  description: "Reach CityFix municipal support, access emergency city hotlines, and send inquiries to departmental operations.",
  openGraph: {
    title: "CityFix Contact & Citizen Helpline",
    description: "Get in touch with municipal teams and city operations desk.",
  },
};

const faqs = [
  {
    q: "How do I track the progress of my reported issue?",
    a: "Every reported issue receives a unique reference code (e.g. REF-12345). You can log in to your Citizen Dashboard at any time to see the live status (SUBMITTED, ASSIGNED, IN PROGRESS, RESOLVED, or CLOSED), assigned technician notes, and remaining SLA time.",
  },
  {
    q: "What happens if a department breaches its SLA deadline?",
    a: "If an issue is not resolved within its published SLA window, our automated SLA watchdog flags the ticket with an SLA Breached badge and triggers high-priority escalation notifications to department directors.",
  },
  {
    q: "How does priority payment processing work?",
    a: "For select non-emergency categories or expedited service, citizens can optionally pay a priority fee using Stripe test cards. Priority fees adjust the SLA deadline with an expedited multiplier and bump the ticket to the top of the technician queue.",
  },
  {
    q: "Can I reopen an issue if it was not resolved satisfactorily?",
    a: "Yes! If a complaint was marked RESOLVED or CLOSED but the field condition remains defective, you can click 'Reopen Complaint' from your dashboard to return the issue to the departmental queue with additional feedback.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 w-full">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          Citizen Support & Inquiries
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Contact Municipal Operations
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Need assistance with an existing ticket, have questions about municipal services, or wish to report feedback? Reach out using the form below or contact our city helplines.
        </p>
      </div>

      {/* Main Grid: Form + Contact Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Quick Contact Information Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Emergency & Quick Contacts
            </h3>

            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
                <span className="text-xs uppercase font-semibold text-muted-foreground block">Municipal Helpline</span>
                <span className="font-mono text-base font-bold text-foreground">311 (Local Toll-Free)</span>
                <p className="text-xs text-muted-foreground">Available Mon–Fri, 8:00 AM – 5:00 PM EST</p>
              </div>

              <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
                <span className="text-xs uppercase font-semibold text-muted-foreground block">Email Support</span>
                <span className="font-medium text-foreground">support@cityfix.local</span>
                <p className="text-xs text-muted-foreground">Typical response time: under 4 business hours</p>
              </div>

              <div className="p-3 rounded-xl bg-muted/30 border space-y-1">
                <span className="text-xs uppercase font-semibold text-muted-foreground block">Central Operations Desk</span>
                <span className="font-medium text-foreground">City Hall, 100 Municipal Way</span>
                <p className="text-xs text-muted-foreground">Civic Center Zone 1 &bull; Open for walk-in inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-6 border-t">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Quick answers to common questions about CityFix and municipal resolution workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl border bg-card space-y-2">
              <h3 className="font-semibold text-base text-foreground">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}