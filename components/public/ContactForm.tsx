"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("General Support");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      toast.success("Thank you! Your inquiry has been dispatched to the municipal desk.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-emerald-500/30 bg-card/90 backdrop-blur-md p-8 text-center space-y-5 shadow-lg"
          >
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-500/20 shadow-xs">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">Message Dispatched Successfully</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-foreground">{name}</strong>. Your inquiry has been routed to the <strong className="text-foreground">{department}</strong> desk. A municipal operations officer will follow up via <strong className="text-foreground">{email}</strong> shortly.
              </p>
            </div>
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
                className="cursor-pointer text-xs h-9 px-4 rounded-xl hover:bg-muted/70"
              >
                Send Another Inquiry
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-card/90 backdrop-blur-md p-6 md:p-8 space-y-5 shadow-xs"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Send an Inquiry</h3>
              <p className="text-xs text-muted-foreground">
                Connect directly with city department operations and citizen service desks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-xs font-semibold">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-name"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-email" className="text-xs font-semibold">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-dept" className="text-xs font-semibold">
                  Department Desk
                </Label>
                <select
                  id="contact-dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="General Support">General Support & Citizen Desk</option>
                  <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                  <option value="Waste & Sanitation">Waste & Sanitation</option>
                  <option value="Drainage & Water">Drainage & Water</option>
                  <option value="Restoration & Safety">Restoration & Safety</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-subject" className="text-xs font-semibold">
                  Subject
                </Label>
                <Input
                  id="contact-subject"
                  placeholder="e.g. Inquiry regarding SLA policy"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message" className="text-xs font-semibold">
                Message <span className="text-destructive">*</span>
              </Label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Please describe your question or inquiry in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-11 rounded-xl cursor-pointer gap-2 font-semibold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-transform"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Submit Inquiry</span>
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
