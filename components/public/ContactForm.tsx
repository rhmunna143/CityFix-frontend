"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
    // Simulate submission / send to contact endpoint if available
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

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center space-y-4 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-bold text-foreground">Message Dispatched Successfully</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Thank you, <strong className="text-foreground">{name}</strong>. Your inquiry has been routed to the <strong>{department}</strong> team. A member of our city operations staff will follow up via <strong className="text-foreground">{email}</strong> shortly.
        </p>
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
          className="cursor-pointer text-xs"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 md:p-8 space-y-5 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">Send an Inquiry</h3>
        <p className="text-xs text-muted-foreground">
          Fill out this form to connect with municipal administrative support.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Full Name *</Label>
          <Input
            id="contact-name"
            required
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Email Address *</Label>
          <Input
            id="contact-email"
            type="email"
            required
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-dept">Department of Interest</Label>
          <select
            id="contact-dept"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            <option value="General Support">General Support & Citizen Desk</option>
            <option value="Roads & Infrastructure">Roads & Infrastructure</option>
            <option value="Waste & Sanitation">Waste & Sanitation</option>
            <option value="Drainage & Water">Drainage & Water</option>
            <option value="Restoration & Safety">Restoration & Safety</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            id="contact-subject"
            placeholder="e.g. Follow-up on SLA policy"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message *</Label>
        <textarea
          id="contact-message"
          required
          rows={4}
          placeholder="Please describe your question or inquiry in detail..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer gap-2">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Submit Inquiry</span>
      </Button>
    </form>
  );
}
