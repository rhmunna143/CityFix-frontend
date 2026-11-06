"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/public/MotionWrappers";
import { LazyOnView } from "@/components/shared/LazyOnView";

const sensors = [
  {
    id: "SNS-WATER-88",
    name: "Drainage Sump Flood Sensor",
    location: "Riverfront Park & Canal Zone B",
    status: "NORMAL",
    reading: "Level: 22% Capacity",
    battery: "98% Solar",
    signal: "5G Telemetry • -62 dBm",
    lastPing: "3 mins ago",
    color: "text-blue-500",
  },
  {
    id: "SNS-ROAD-14",
    name: "Asphalt Vibration Defect Node",
    location: "Central Avenue & 4th Street",
    status: "WARNING",
    reading: "Vibration: 4.8 G (Surface Depression)",
    battery: "91% Solar",
    signal: "LoRaWAN • -71 dBm",
    lastPing: "12 secs ago",
    color: "text-amber-500",
  },
  {
    id: "SNS-WASTE-42",
    name: "Smart Dumpster Ultrasound Monitor",
    location: "West Market Commercial Plaza",
    status: "DISPATCH TRIGGERED",
    reading: "Fill Volume: 92% (Threshold Exceeded)",
    battery: "87% Battery",
    signal: "NB-IoT • -68 dBm",
    lastPing: "1 min ago",
    color: "text-emerald-500",
  },
  {
    id: "SNS-LIGHT-09",
    name: "Solar Luminaire Grid Telemetry",
    location: "East Sector Ring Road",
    status: "NORMAL",
    reading: "Power: 12.6V • Lumens: 3200 lm",
    battery: "100% Solar Active",
    signal: "5G Mesh • -58 dBm",
    lastPing: "4 mins ago",
    color: "text-purple-500",
  },
];

export function SmartCityGridSection() {
  const [selectedSensor, setSelectedSensor] = useState(0);
  const current = sensors[selectedSensor];

  return (
    <LazyOnView minHeight={600}>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-radial from-slate-950 via-slate-900 to-black text-white">
      {/* Background Smart City Panorama */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80"
          alt="Smart City Night Skyline"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            IoT Telemetry & Smart Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Smart City Geo-Sensing & Civic Tech Stack
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Connected sensor nodes stream real-time environmental and road
            telemetry directly into our automated dispatch engine.
          </p>
        </FadeIn>

        {/* Tech Stack 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">
              📡
            </div>
            <h3 className="font-bold text-sm text-white">
              Automated AI Detection
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Municipal vehicle dashboard cameras scan pavement surfaces in real
              time to catalog pothole depths.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🌊
            </div>
            <h3 className="font-bold text-sm text-white">
              Drainage Float Sensors
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subsurface ultrasonic nodes trigger automatic pump truck
              dispatches before street flooding begins.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <h3 className="font-bold text-sm text-white">
              Smart Route Optimization
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dynamic GPS routing cuts fuel waste and gets technician crews to
              critical emergencies in under 30 minutes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
              🔒
            </div>
            <h3 className="font-bold text-sm text-white">
              Public Audit Ledger
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every ticket update and resolution timestamp is permanently
              written to an immutable public record.
            </p>
          </div>
        </div>

        {/* Live Interactive Telemetry Terminal */}
        <FadeIn delay={0.15}>
          <div className="rounded-3xl border border-white/15 bg-black/60 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-400">
                  Live Sensor Network Telemetry
                </span>
              </div>
              <span className="font-mono text-xs text-zinc-400">
                Active Nodes: 124 / 124 Online
              </span>
            </div>

            {/* Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sensors.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSensor(idx)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedSensor === idx
                      ? "bg-white/15 border-primary shadow-xs"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="font-mono text-[10px] text-zinc-400 block">
                    {s.id}
                  </span>
                  <span className="font-bold text-xs text-white line-clamp-1">
                    {s.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Sensor Readout */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                  Sensor Node & Location
                </span>
                <span className="font-bold text-white text-sm block">
                  {current.name}
                </span>
                <span className="text-zinc-400 text-xs block">
                  {current.location}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                  Live Telemetry Reading
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm block">
                  {current.reading}
                </span>
                <span className="text-zinc-400 text-xs block">
                  Last ping: {current.lastPing}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                  Power & Protocol
                </span>
                <span className="font-mono text-white text-xs block">
                  {current.battery}
                </span>
                <span className="font-mono text-zinc-400 text-[11px] block">
                  {current.signal}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </LazyOnView>
  );
}
