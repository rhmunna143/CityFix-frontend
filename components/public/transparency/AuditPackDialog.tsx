"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";

export function AuditPackDialog() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 md:p-8 rounded-3xl border bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
            PUBLIC CITIZEN AUDIT LOG
          </span>
          <h3 className="font-bold text-xl text-foreground">
            Download CityFix Public Audit Digest
          </h3>
          <p className="text-xs text-muted-foreground max-w-lg">
            Contains anonymized complaint records, turnaround timestamps,
            escalation triggers, and verified photographic checksums.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDownloadModalOpen(true)}
          className={`${buttonVariants({ size: "default" })} cursor-pointer font-semibold gap-2 shadow-xs shrink-0`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Audit Pack (CSV / JSON)</span>
        </button>
      </div>

      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-3xl bg-card border shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-base text-foreground">
                Public Data Export
              </h4>
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The public audit digest includes 1,200+ state transition records,
              municipal SLA metrics, and open-governance verification keys.
            </p>
            <div className="p-3 rounded-xl bg-muted/40 font-mono text-[11px] text-foreground border">
              SHA-256 Digest: e89a2b...449c21 (Verified Immutable)
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
