"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, BrainCircuit, Layout, Database, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    id: "01",
    title: "CUSTOM SOFTWARE ENGINEERING",
    desc: "Production-grade digital systems engineered around exact enterprise domain requirements, not generic off-the-shelf boilerplate.",
    tech: ["Next.js 16", "React 19", "TypeScript", "FastAPI", "PostgreSQL", "Cloudflare WAF"],
    icon: Code2
  },
  {
    id: "02",
    title: "AUTONOMOUS AI & MULTI-AGENT SWARMS",
    desc: "Autonomous multi-agent swarms designed around deterministic reasoning loops, verified tool-calling, and hybrid vector RAG.",
    tech: ["LangChain", "Gemini 2.0", "ReAct Loops", "Pinecone RAG", "Prompt Hardening", "Agent Telemetry"],
    icon: BrainCircuit
  },
  {
    id: "03",
    title: "SCALABLE SAAS & PLATFORM ARCHITECTURE",
    desc: "Multi-tenant cloud architectures featuring sub-second response times, automated billing, and military-grade Row Level Security.",
    tech: ["Supabase RLS", "Stripe", "Redis PubSub", "WebSockets", "Vercel Edge", "AWS"],
    icon: Layout
  },
  {
    id: "04",
    title: "ENTERPRISE AUTOMATIONS & CRM INTEGRATIONS",
    desc: "Autonomous event pipelines synchronizing data across Google Workspace, Google Sheets, transactional Resend mailers, and custom internal CMS suites.",
    tech: ["Google Apps Script", "Resend API", "Webhook Gateways", "Audit Logs", "Kanban Ops"],
    icon: Database
  }
];

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-28 md:py-44 bg-background text-foreground border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full aurora-glow-purple blur-3xl pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-mono text-xs mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            02 / CORE CAPABILITIES
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-[84px] font-extrabold tracking-tight text-[#09090B] dark:text-white leading-none font-heading">
            From architecture <br />
            <span className="text-accent-purple">
              to production interface.
            </span>
          </h2>
        </div>

        <div className="border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col">
          {capabilities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                "group border-b border-black/[0.08] dark:border-white/[0.08] transition-colors duration-500 relative cursor-pointer overflow-hidden",
                hoveredIdx === idx ? "bg-black/[0.02] dark:bg-white/[0.03]" : ""
              )}
            >
              <div className="py-12 md:py-16 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between z-10 relative">
                
                {/* Left: Number + Title */}
                <div className="flex items-center gap-6 md:gap-12 w-full md:w-5/12 mb-6 md:mb-0">
                  <span className="font-mono text-xl md:text-2xl text-accent-purple/80 group-hover:text-accent-purple transition-colors font-bold">
                    {item.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#09090B] dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Middle: Desc + Tech */}
                <div className="flex flex-col gap-4 w-full md:w-5/12">
                  <p className="text-[#52525B] dark:text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 border border-black/[0.08] dark:border-white/10 rounded-full font-mono text-[10px] text-[#52525B] dark:text-neutral-300 tracking-wider uppercase group-hover:border-accent-purple/40 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Interactive Arrow */}
                <div className="hidden md:flex justify-end w-2/12">
                  <div className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-accent-purple group-hover:text-white text-[#09090B] dark:text-white transition-all duration-300 group-hover:scale-110 shadow-md group-hover:shadow-accent-purple/30">
                    <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300 w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Technical Visual Background on Hover (Desktop only) */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center pointer-events-none opacity-10 dark:opacity-15"
                  >
                    <item.icon size={220} strokeWidth={0.5} className="text-accent-purple transform translate-x-1/4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
