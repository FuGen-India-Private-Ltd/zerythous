"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Code2, Lock, Sparkles, CheckCircle2 } from "lucide-react";

const principles = [
  { id: "01", title: "ENGINEERING OVER QUICK HACKS", desc: "We prioritize robust architecture over fragile shortcuts. Solid foundations create lasting products that scale effortlessly without expensive emergency rewrites." },
  { id: "02", title: "AUTONOMOUS AI WITH MEASURABLE ROI", desc: "Intelligence integrated to solve real product bottlenecks—not shallow wrapper prompts added to impress pitch decks. Grounded with dense vectors and evaluation benchmarks." },
  { id: "03", title: "PRODUCT-LED ARCHITECTURE", desc: "Every database choice, API schema, and animation is weighed against its direct impact on user retention, latency, and business metrics." },
  { id: "04", title: "BUILT TO SCALE ON DAY 1", desc: "Modular microservices and event-driven backends designed to handle 100x traffic bursts smoothly from day one with automatic cloud elasticity." },
];

const guarantees = [
  {
    icon: Lock,
    title: "100% Client IP Ownership",
    desc: "You own every single line of code, Docker file, and infrastructure script. Complete repository transfer upon completion."
  },
  {
    icon: Cpu,
    title: "Deterministic AI Systems",
    desc: "Grounded RAG pipelines, strict evaluation benchmarks, and guardrails to prevent hallucinations and token bloat."
  },
  {
    icon: Code2,
    title: "Production Standards",
    desc: "Next.js 16, TypeScript, automated CI/CD pipelines, and 95+ Lighthouse performance scores guaranteed."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "PostgreSQL Row Level Security (RLS), input sanitization, rate-limiting, and encrypted sessions compliant with SOC-2 standards."
  }
];

export default function WhyZerythous() {
  return (
    <section className="py-28 md:py-44 bg-background text-foreground border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full aurora-glow-purple blur-3xl pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-mono text-xs mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            03 / THE ZERYTHOUS ADVANTAGE
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[92px] font-extrabold tracking-tight text-[#09090B] dark:text-white leading-none font-heading">
            We don&apos;t add <br />
            <span className="text-accent-purple">
              complexity.
            </span><br />
            We engineer precision.
          </h2>
        </motion.div>

        {/* Principles List */}
        <div className="flex flex-col gap-10 mb-24">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 border-t border-black/[0.08] dark:border-white/[0.08] pt-8"
            >
              <div className="font-mono text-xl md:text-2xl text-accent-purple shrink-0 w-16 font-bold">
                {p.id}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#09090B] dark:text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-[#52525B] dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Guarantees Grid */}
        <div className="pt-16 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="text-xs font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-widest mb-8 font-semibold">
            ENTERPRISE CONTRACTUAL GUARANTEES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-card flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#09090B] dark:text-white mb-2">{g.title}</h4>
                    <p className="text-xs text-[#52525B] dark:text-neutral-400 leading-relaxed font-light">{g.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-[10px] font-mono text-accent-purple flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED STANDARD
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
