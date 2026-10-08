"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  links?: { label: string; href: string }[];
  timestamp: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hello! I am your **CityFix Civic AI Assistant**. I can help you report neighborhood problems, check departmental SLA turnaround times, understand priority processing, or guide you through city services.",
    links: [
      {
        label: "Report an Issue",
        href: "/login?next=/dashboard/complaints/new",
      },
      { label: "Browse Services", href: "/services" },
      { label: "View Public Transparency", href: "/transparency" },
    ],
    timestamp: "Just now",
  },
];

const suggestionChips = [
  "How do I report a pothole?",
  "What is the SLA for water leaks?",
  "How does priority fee work?",
  "How do I track my complaint?",
  "Which department handles garbage?",
];

function generateBotResponse(userQuery: string): {
  text: string;
  links?: { label: string; href: string }[];
} {
  const query = userQuery.toLowerCase();

  if (
    query.includes("pothole") ||
    query.includes("road") ||
    query.includes("asphalt") ||
    query.includes("pavement")
  ) {
    return {
      text: "Road damages and potholes are managed by the **Roads & Infrastructure Department** with a standard **48-hour SLA** target.\n\nTo file:\n1. Snap a quick photo of the surface damage\n2. Drop a GPS pin on the interactive map\n3. Our system automatically alerts on-duty road technicians.",
      links: [
        {
          label: "Report Road Issue",
          href: "/login?next=/dashboard/complaints/new",
        },
        { label: "Road Services Info", href: "/services" },
      ],
    };
  }

  if (
    query.includes("water") ||
    query.includes("leak") ||
    query.includes("drain") ||
    query.includes("flood") ||
    query.includes("sewage")
  ) {
    return {
      text: "Water leaks, blocked drains, and sewage issues are categorized under **Drainage & Water Services** with an urgent **24-hour SLA** turnaround. Emergency repairs are dispatched immediately to prevent property damage.",
      links: [
        {
          label: "Report Water Problem",
          href: "/login?next=/dashboard/complaints/new",
        },
        { label: "Municipal 311 Emergency", href: "/contact" },
      ],
    };
  }

  if (
    query.includes("waste") ||
    query.includes("garbage") ||
    query.includes("trash") ||
    query.includes("sanitation") ||
    query.includes("dump")
  ) {
    return {
      text: "Garbage accumulation and overflowing dumpsters are handled by **Waste & Sanitation** with a **24-hour SLA**. Verified collection crews are assigned with photo-verified pickup proof upon completion.",
      links: [
        {
          label: "Report Waste Overflow",
          href: "/login?next=/dashboard/complaints/new",
        },
        { label: "Sanitation Catalog", href: "/services" },
      ],
    };
  }

  if (
    query.includes("priority") ||
    query.includes("stripe") ||
    query.includes("fee") ||
    query.includes("payment") ||
    query.includes("pay")
  ) {
    return {
      text: "CityFix standard reporting is completely **free**. For select categories or expedited resolution, citizens can choose **Stripe Priority Processing** which applies an expedited turnaround multiplier and bumps the complaint to the top of technician field queues.",
      links: [
        { label: "Explore Priority Services", href: "/services" },
        { label: "Transparency Fee Policy", href: "/transparency" },
      ],
    };
  }

  if (
    query.includes("track") ||
    query.includes("status") ||
    query.includes("ref") ||
    query.includes("progress")
  ) {
    return {
      text: "Every report is assigned a unique reference code (e.g. `REF-84920`). You can track live technician notes, supervisor assignments, and SLA countdown clocks inside your **Citizen Dashboard**.",
      links: [
        { label: "Go to Dashboard", href: "/dashboard" },
        { label: "Public Transparency Data", href: "/transparency" },
      ],
    };
  }

  if (
    query.includes("sla") ||
    query.includes("deadline") ||
    query.includes("breach") ||
    query.includes("time") ||
    query.includes("hours")
  ) {
    return {
      text: "**Service Level Agreements (SLAs)** are legally enforced target response windows (typically 24h to 48h). An automated watchdog tracks the live timer. If an issue is not resolved in time, it is flagged as **SLA Breached** and escalated to department directors.",
      links: [
        { label: "View SLA Metrics", href: "/transparency" },
        { label: "Learn About CityFix", href: "/about" },
      ],
    };
  }

  if (
    query.includes("reopen") ||
    query.includes("unsatisfied") ||
    query.includes("not fixed")
  ) {
    return {
      text: "If a complaint was marked RESOLVED but the problem persists, you can click **Reopen Complaint** in your dashboard within 7 days. This will escalate the ticket back to departmental supervisors for secondary inspection.",
      links: [{ label: "Access Dashboard", href: "/dashboard" }],
    };
  }

  // Default fallback response
  return {
    text: "I understand you have a question regarding municipal civic action. You can file a new report in under 60 seconds with GPS and photos, or contact our city helpline desk for personalized assistance.",
    links: [
      {
        label: "File a Complaint",
        href: "/login?next=/dashboard/complaints/new",
      },
      { label: "Browse Services", href: "/services" },
      { label: "Citizen Support Helpline", href: "/contact" },
    ],
  };
}

export function AiAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReply.text,
        links: botReply.links,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group h-12 w-12 rounded-full bg-gradient-to-tr from-primary via-blue-600 to-indigo-600 text-white shadow-xl shadow-primary/30 flex items-center justify-center cursor-pointer border border-white/20 hover:shadow-primary/40 transition-shadow"
          aria-label="Open CityFix AI Assistant"
        >
          {/* Subtle glowing halo */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-blue-400 opacity-60 blur-xs group-hover:opacity-100 transition duration-300 animate-pulse -z-10" />

          {/* Online green indicator */}
          <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-background" />

          {isOpen ? (
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <rect x="4" y="8" width="16" height="12" rx="4" />
              <circle cx="9" cy="13" r="1.5" fill="currentColor" />
              <circle cx="15" cy="13" r="1.5" fill="currentColor" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[80vh] rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 px-4 bg-gradient-to-r from-primary/10 via-background to-primary/5 border-b flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-blue-500 text-white flex items-center justify-center shadow-xs">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="4" y="8" width="16" height="12" rx="4" />
                    <circle cx="9" cy="13" r="1.5" fill="currentColor" />
                    <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                    <line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    CityFix Civic AI
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/20 text-primary font-semibold">
                      v2.0
                    </span>
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online &bull; 24/7 Municipal Desk
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReset}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
                  title="Reset Conversation"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
                  title="Close Assistant"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        isUser
                          ? "bg-primary text-primary-foreground font-medium rounded-br-xs shadow-xs"
                          : "bg-muted/70 text-foreground border border-border/60 rounded-bl-xs shadow-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Attached Action Links */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                          {msg.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-background border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>{link.label}</span>
                              <span>&rarr;</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 p-2 px-3 rounded-2xl bg-muted/60 border border-border/50 w-fit text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-3 py-1.5 border-t bg-muted/20 overflow-x-auto scrollbar-none flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase whitespace-nowrap pl-1">
                Ask:
              </span>
              {suggestionChips.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(chip)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t bg-background flex items-center gap-2"
            >
              <Input
                placeholder="Ask about municipal services, SLAs, reporting..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-9 text-xs rounded-xl flex-1 bg-muted/30"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputValue.trim() || isTyping}
                className="h-9 px-3 rounded-xl cursor-pointer gap-1 shadow-xs font-semibold"
              >
                <span>Send</span>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
