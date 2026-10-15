"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Code2, Lock } from "lucide-react";

const principles = [
  { id: "01", title: "ENGINEERING FIRST", desc: "We prioritize robust architecture over quick hacks. Solid foundations create lasting products that scale without emergency rewrites." },
  { id: "02", title: "AI WITH MEASURABLE ROI", desc: "Intelligence integrated to solve real product bottlenecks—not shallow wrapper prompts added to impress pitch decks." },
  { id: "03", title: "PRODUCT THINKING", desc: "Every database choice, API schema, and animation is weighed against its direct impact on user retention and business metrics." },
  { id: "04", title: "BUILT TO SCALE", desc: "Modular microservices and event-driven backends designed to handle 10x traffic bursts smoothly from Day 1." },
];

const guarantees = [
  {
    icon: Lock,
    title: "100% IP Ownership",
    desc: "You own every single line of code, Docker file, and infrastructure script. Zero vendor lock-in."
  },
  {
    icon: Cpu,
    title: "Deterministic AI",
    desc: "Grounded RAG pipelines, strict evaluation benchmarks, and guardrails to prevent hallucinations."
  },
  {
    icon: Code2,
    title: "Production Standards",
    desc: "Next.js 16, TypeScript, automated CI/CD pipelines, and 95+ Lighthouse performance scores."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "PostgreSQL Row Level Security (RLS), input sanitization, rate-limiting, and encrypted sessions."
  }
];

export default function WhyZerythous() {
  return (
    <section className="py-32 md:py-48 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-32"
        >
          <p className="font-mono text-xs tracking-widest text-[#71717A] uppercase mb-6">
            05 / THE ZERYTHOUS ADVANTAGE
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] font-medium tracking-tight text-[#050505] leading-none">
            We don&apos;t add <br />
            <span className="text-[#52525B]">complexity.</span><br />
            We remove it.
          </h2>
        </motion.div>

        {/* Principles List */}
        <div className="flex flex-col gap-12 md:gap-16 mb-28">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 border-t border-[rgba(0,0,0,0.08)] pt-10"
            >
              <div className="font-mono text-2xl md:text-3xl text-accent-purple opacity-80 shrink-0 w-16">
                {p.id}
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-[#050505] tracking-tight md:w-1/2">
                {p.title}
              </h3>
              <p className="text-base md:text-lg text-[#52525B] font-light leading-relaxed md:w-1/2 mt-2 md:mt-0">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Client Protections */}
        <div className="bg-[#F7F7F5] border border-[rgba(0,0,0,0.08)] rounded-2xl p-8 md:p-12">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-purple font-semibold">
              CONTRACTUAL CLIENT GUARANTEES
            </span>
            <h4 className="text-2xl md:text-3xl font-medium text-[#09090B] mt-2 font-heading">
              Why Ambitious Founders & CTOs Trust Zerythous
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g, idx) => (
              <div key={idx} className="bg-white border border-[rgba(0,0,0,0.06)] rounded-xl p-6 flex flex-col justify-between">
                <g.icon size={28} className="text-accent-purple mb-4" />
                <h5 className="font-heading font-medium text-base text-[#09090B] mb-2">{g.title}</h5>
                <p className="text-xs text-[#52525B] leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
