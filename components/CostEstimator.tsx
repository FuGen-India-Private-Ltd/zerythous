"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface CapabilityOption {
  id: string;
  name: string;
  price: number;
  weeks: number;
  category: string;
}

const CAPABILITY_OPTIONS: CapabilityOption[] = [
  { id: "agents", name: "Multi-Agent AI Swarm (LangChain / ReAct)", price: 2800, weeks: 1.5, category: "AI & INTELLIGENCE" },
  { id: "rag", name: "Hybrid Vector RAG & Semantic Search", price: 1900, weeks: 1, category: "AI & INTELLIGENCE" },
  { id: "realtime", name: "Real-Time WebSockets & Telemetry", price: 1600, weeks: 1, category: "BACKEND & INFRA" },
  { id: "mobile", name: "Cross-Platform Mobile App (iOS & Android)", price: 3400, weeks: 2, category: "FRONTEND & APPS" },
  { id: "cms", name: "Bespoke Admin CMS & Kanban Suite", price: 1800, weeks: 1, category: "OPERATIONS & CMS" },
  { id: "security", name: "SOC-2 Ready Hardening & Penetration Defense", price: 1500, weeks: 0.5, category: "SECURITY" },
];

export default function CostEstimator() {
  const [tier, setTier] = useState<"mvp" | "production" | "enterprise">("production");
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(["agents", "rag", "cms"]);
  const [scale, setScale] = useState<"startup" | "growth" | "enterprise">("growth");

  const toggleCapability = (id: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const { totalWeeks, minPrice, maxPrice } = useMemo(() => {
    let basePrice = 3500;
    let baseWeeks = 3;

    if (tier === "mvp") {
      basePrice = 2800;
      baseWeeks = 2.5;
    } else if (tier === "production") {
      basePrice = 4800;
      baseWeeks = 4;
    } else if (tier === "enterprise") {
      basePrice = 8500;
      baseWeeks = 7;
    }

    const capabilitiesPrice = selectedCapabilities.reduce((acc, id) => {
      const cap = CAPABILITY_OPTIONS.find((c) => c.id === id);
      return acc + (cap ? cap.price : 0);
    }, 0);

    const capabilitiesWeeks = selectedCapabilities.reduce((acc, id) => {
      const cap = CAPABILITY_OPTIONS.find((c) => c.id === id);
      return acc + (cap ? cap.weeks : 0);
    }, 0);

    let scaleMultiplier = 1;
    if (scale === "growth") scaleMultiplier = 1.15;
    if (scale === "enterprise") scaleMultiplier = 1.35;

    const finalMin = Math.round((basePrice + capabilitiesPrice) * scaleMultiplier);
    const finalMax = Math.round(finalMin * 1.25);
    const finalWeeks = Math.max(2, Math.round(baseWeeks + capabilitiesWeeks * 0.75));

    return {
      totalWeeks: finalWeeks,
      minPrice: finalMin,
      maxPrice: finalMax,
    };
  }, [tier, selectedCapabilities, scale]);

  return (
    <section id="estimator" className="py-28 md:py-44 bg-background text-foreground relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full aurora-glow-purple blur-3xl pointer-events-none opacity-40" />
      <div className="absolute inset-0 grid-pattern-dual pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-mono text-xs mb-4 font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            TRANSPARENT ENGINEERING BLUEPRINT
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#09090B] dark:text-white leading-none mb-6 font-heading">
            Instant Scope & <br />
            <span className="text-accent-purple">
              Investment Estimator.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] dark:text-neutral-400 leading-relaxed font-light">
            Configure your technical scope, scale parameters, and architectural capabilities to receive a real-time capital range and sprint timeline estimate.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: System Scope */}
            <div className="p-6 rounded-2xl glass-card">
              <label className="text-xs font-mono font-bold text-[#09090B] dark:text-neutral-200 uppercase tracking-wider block mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent-purple/20 text-accent-purple text-xs flex items-center justify-center font-bold">1</span>
                System Scope & Target Maturity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "mvp", title: "Proof-of-Concept", desc: "Fast prototype validation", time: "2-4 wks" },
                  { id: "production", title: "Full Production", desc: "Complete scalable launch", time: "5-8 wks" },
                  { id: "enterprise", title: "Enterprise Platform", desc: "Multi-agent swarm & compliance", time: "8-14 wks" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTier(item.id as typeof tier)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      tier === item.id
                        ? "bg-white dark:bg-neutral-900 border-accent-purple shadow-md shadow-accent-purple/10"
                        : "bg-white/60 dark:bg-neutral-950/60 border-black/[0.08] dark:border-white/[0.08] hover:border-accent-purple/40"
                    }`}
                  >
                    <div className="text-xs font-mono text-accent-purple mb-1 font-semibold">{item.time}</div>
                    <div className="text-sm font-bold text-[#09090B] dark:text-white mb-1">{item.title}</div>
                    <div className="text-xs text-[#52525B] dark:text-neutral-400 font-light">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Capabilities Matrix */}
            <div className="p-6 rounded-2xl glass-card">
              <label className="text-xs font-mono font-bold text-[#09090B] dark:text-neutral-200 uppercase tracking-wider block mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent-purple/20 text-accent-purple text-xs flex items-center justify-center font-bold">2</span>
                Required Architecture Capabilities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAPABILITY_OPTIONS.map((opt) => {
                  const isChecked = selectedCapabilities.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleCapability(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        isChecked
                          ? "bg-white dark:bg-neutral-900/90 border-accent-purple shadow-sm shadow-accent-purple/10"
                          : "bg-white/60 dark:bg-neutral-950/60 border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/40"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 border transition-colors ${
                          isChecked
                            ? "bg-accent-purple border-accent-purple text-white"
                            : "border-black/20 dark:border-neutral-600 bg-white/50 dark:bg-neutral-900"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-bold ${isChecked ? "text-accent-purple dark:text-white" : "text-[#52525B] dark:text-neutral-300"}`}>
                          {opt.name}
                        </div>
                        <div className="text-[10px] font-mono text-accent-purple mt-0.5 font-semibold">
                          +{opt.weeks}w • +${opt.price.toLocaleString()}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Scale & Reliability SLA */}
            <div className="p-6 rounded-2xl glass-card">
              <label className="text-xs font-mono font-bold text-[#09090B] dark:text-neutral-200 uppercase tracking-wider block mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent-purple/20 text-accent-purple text-xs flex items-center justify-center font-bold">3</span>
                Infrastructure Scale & Concurrency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "startup", name: "< 10k Users", sub: "99.9% SLA" },
                  { id: "growth", name: "10k - 250k", sub: "99.95% SLA" },
                  { id: "enterprise", name: "Millions", sub: "99.99% Multi-Reg" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScale(s.id as typeof scale)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all ${
                      scale === s.id
                        ? "bg-white dark:bg-neutral-900 border-accent-purple text-[#09090B] dark:text-white font-bold shadow-sm"
                        : "bg-white/60 dark:bg-neutral-950/60 border-black/[0.06] dark:border-white/[0.06] text-[#52525B] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{s.name}</div>
                    <div className="text-[10px] font-mono text-[#71717A] dark:text-neutral-400 mt-0.5">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl glass-card p-6 sm:p-8 border-2 border-accent-purple/30 shadow-xl dark:shadow-2xl shadow-accent-purple/5 dark:shadow-black/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08] mb-6">
              <span className="text-xs font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-wider font-semibold">
                ESTIMATED SPRINT SPECIFICATION
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-accent-purple/10 text-accent-purple border border-accent-purple/30">
                100% IP OWNERSHIP
              </span>
            </div>

            {/* Estimated Price Range */}
            <div className="mb-6">
              <div className="text-xs font-mono text-[#71717A] dark:text-neutral-400 uppercase mb-1">
                Estimated Capital Allocation
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#09090B] dark:text-white tracking-tight flex items-baseline gap-2">
                <span className="text-accent-purple">${minPrice.toLocaleString()}</span>
                <span className="text-[#71717A] dark:text-neutral-500 text-xl font-normal">—</span>
                <span>${maxPrice.toLocaleString()}</span>
                <span className="text-xs font-mono text-[#71717A] dark:text-neutral-400 font-normal">USD</span>
              </div>
            </div>

            {/* Delivery Window */}
            <div className="p-4 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.08] dark:border-white/[0.08] mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accent-purple/10 text-accent-purple">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#71717A] dark:text-neutral-400 uppercase">Production Sprint Window</div>
                  <div className="text-lg font-bold text-[#09090B] dark:text-white font-mono">{totalWeeks} Weeks Total</div>
                </div>
              </div>
              <span className="text-xs font-mono text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded border border-accent-purple/20 font-semibold">
                AGILE SPRINTS
              </span>
            </div>

            {/* What's Guaranteed */}
            <div className="space-y-2.5 mb-8 text-xs text-[#52525B] dark:text-neutral-300">
              <div className="text-[11px] font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                Guaranteed in Every Zerythous Delivery:
              </div>
              {[
                "100% Client IP Ownership (Full git repository & secrets handoff)",
                "Next.js 16 Edge / React 19 / Supabase RLS Production Architecture",
                "Automated Google Sheets Webhook Sync & Resend Transactional Mailer",
                "Custom Dedicated Admin CMS & Pipeline Kanban Suite",
                "30-Day Post-Launch Hypercare & Performance Guarantee (95+ Lighthouse)",
              ].map((g, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple shrink-0 mt-0.5" />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <a
              href="#project-builder"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#09090B] text-white hover:bg-accent-purple dark:bg-white dark:text-[#09090B] dark:hover:bg-accent-purple dark:hover:text-white font-medium text-sm transition-all shadow-md group"
            >
              <span>Lock This Scope in Project Builder</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
