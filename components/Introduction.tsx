"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDown, Layers, CheckCircle2 } from "lucide-react";

const architectureLayers = [
  { 
    id: "user", 
    label: "01 / CLIENT & INTELLIGENCE RUNTIME", 
    details: "Next.js 16 Edge / React 19 / Native. Zero CLS, sub-50ms First Contentful Paint, and fluid micro-interactions."
  },
  { 
    id: "api", 
    label: "02 / SECURE API GATEWAY", 
    details: "REST APIs / GraphQL / tRPC / Tokenized Rate Limiting / Cloudflare WAF protection."
  },
  { 
    id: "logic", 
    label: "03 / CORE DOMAIN & ORCHESTRATION", 
    details: "Node.js / Python / Go. Event loops, async workers, cron schedules, and idempotent business logic."
  },
  { 
    id: "ai", 
    label: "04 / MULTI-AGENT SWARM & RAG", 
    details: "LangChain / OpenAI / Gemini 2.0 / ReAct loops with hybrid dense & sparse semantic retrieval (Pinecone)."
  },
  { 
    id: "data", 
    label: "05 / PERSISTENCE & ROW LEVEL SECURITY", 
    details: "PostgreSQL / Supabase / Redis / PostGIS. Hardened with cryptographic RLS isolating tenant namespaces."
  },
  { 
    id: "cloud", 
    label: "06 / CLOUD MESH & DEPLOYMENT", 
    details: "Vercel Edge / AWS / Kubernetes. Global auto-scaling with 99.99% multi-region failover SLA."
  },
];

const pipelineSteps = [
  { step: "01", name: "DISCOVER", desc: "Requirements & feasibility scoping" },
  { step: "02", name: "ARCHITECT", desc: "Topology & data boundary blueprints" },
  { step: "03", name: "BUILD", desc: "Production code & agent implementation" },
  { step: "04", name: "INTEGRATE", desc: "APIs, databases & security audits" },
  { step: "05", name: "DEPLOY", desc: "Zero-downtime edge release & testing" },
  { step: "06", name: "SCALE", desc: "Telemetry monitoring & ongoing growth" },
];

export default function Introduction() {
  const [activeLayer, setActiveLayer] = useState<string | null>("ai");

  return (
    <section className="py-28 md:py-40 bg-background text-foreground border-y border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full aurora-glow-purple blur-3xl pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-mono text-xs mb-4 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            01 / ENGINEERING METHODOLOGY
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-[84px] font-extrabold tracking-tighter text-[#09090B] dark:text-white leading-[1.05] max-w-4xl font-heading">
            FROM INCEPTION <br />
            TO PRODUCTION <br />
            <span className="text-accent-purple">
              ARCHITECTURE.
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Pipeline Timeline */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="text-xs font-mono text-[#71717A] dark:text-neutral-400 tracking-widest uppercase mb-8 border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
              <span>EXECUTION PROTOCOL</span>
              <span className="text-accent-purple font-bold">6 PHASES</span>
            </div>

            <div className="space-y-4">
              {pipelineSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-xl glass-card flex items-start gap-4 group transition-all hover:border-accent-purple/40"
                >
                  <span className="font-mono text-xs font-bold text-accent-purple px-2 py-1 rounded bg-accent-purple/10 border border-accent-purple/20">
                    {step.step}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-[#09090B] dark:text-white group-hover:text-accent-purple transition-colors">
                      {step.name}
                    </div>
                    <div className="text-xs text-[#52525B] dark:text-neutral-400 mt-0.5">
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-5 glass-card rounded-xl border border-black/10 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-mono text-accent-purple mb-2 font-bold">
                <CheckCircle2 className="w-4 h-4" /> GUARANTEED PERFORMANCE
              </div>
              <p className="text-xs text-[#52525B] dark:text-neutral-300 leading-relaxed relative z-10">
                Every software system we release adheres to strict Lighthouse performance scores (95-100), automated unit & integration testing, and zero-trust security postures.
              </p>
            </div>
          </div>

          {/* RIGHT: Architecture Board */}
          <div className="w-full lg:w-7/12">
            <div className="text-xs font-mono text-[#71717A] dark:text-neutral-400 tracking-widest uppercase mb-8 border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
              <span>INTERACTIVE SYSTEM TOPOLOGY</span>
              <span className="text-[#71717A] dark:text-neutral-500">CLICK TO EXPAND LAYER</span>
            </div>
            
            <div className="w-full flex flex-col items-center max-w-xl mx-auto relative">
              {architectureLayers.map((layer, idx) => {
                const isActive = activeLayer === layer.id;

                return (
                  <div key={layer.id} className="w-full flex flex-col items-center">
                    <button
                      onClick={() => setActiveLayer(isActive ? null : layer.id)}
                      className={cn(
                        "w-full py-4 px-6 rounded-xl transition-all duration-300 relative text-left overflow-hidden border focus:outline-none",
                        isActive 
                          ? "bg-white dark:bg-neutral-900 border-accent-purple shadow-xl shadow-accent-purple/15 scale-[1.02] z-10" 
                          : "bg-white/70 dark:bg-neutral-950/70 border-black/[0.08] dark:border-white/[0.08] hover:border-accent-purple/40 hover:bg-white dark:hover:bg-neutral-900/60"
                      )}
                    >
                      {isActive && (
                        <motion.div layoutId="activeArchLayer" className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent-purple" />
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "font-mono text-xs md:text-sm tracking-wider font-bold transition-colors",
                          isActive ? "text-accent-purple" : "text-[#09090B] dark:text-white"
                        )}>
                          {layer.label}
                        </span>
                        <span className="text-xs font-mono text-[#71717A] dark:text-neutral-500 font-bold">
                          {isActive ? "ACTIVE" : "+"}
                        </span>
                      </div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-black/10 dark:border-white/10"
                          >
                            <p className="text-xs text-[#52525B] dark:text-neutral-300 font-mono leading-relaxed">
                              {layer.details}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    
                    {idx < architectureLayers.length - 1 && (
                      <div className="h-4 flex justify-center items-center relative z-0">
                        <div className="w-px h-full bg-black/10 dark:bg-white/10" />
                        <ArrowDown size={10} className="text-[#71717A] dark:text-neutral-500 absolute bottom-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
