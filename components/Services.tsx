"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, BrainCircuit, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    id: "01",
    title: "SOFTWARE ENGINEERING",
    desc: "Production-grade software engineered around real requirements, not generic templates.",
    tech: ["Next.js", "React", "TypeScript", "APIs", "Databases", "Authentication", "Cloud"],
    icon: Code2
  },
  {
    id: "02",
    title: "AI SYSTEMS",
    desc: "AI systems designed around useful intelligence, reliable grounding, and measurable product value.",
    tech: ["Agents", "RAG", "LLMs", "Automation", "AI APIs", "Vector Search"],
    icon: BrainCircuit
  },
  {
    id: "03",
    title: "PRODUCT ENGINEERING",
    desc: "Products that feel simple on the surface because the engineering underneath is deliberate.",
    tech: ["UX", "Design Systems", "Dashboards", "SaaS", "Real-time Apps", "Performance"],
    icon: Layout
  }
];

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-40 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24">
          <p className="font-mono text-xs tracking-widest text-[#52525B] uppercase mb-8">
            03 / Capabilities
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-medium tracking-tight text-[#050505] leading-none">
            From architecture <br />
            <span className="text-[#52525B]">to interface.</span>
          </h2>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] flex flex-col">
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
                "group border-b border-[rgba(0,0,0,0.08)] transition-colors duration-500 relative cursor-pointer overflow-hidden",
                hoveredIdx === idx ? "bg-[rgba(0,0,0,0.02)]" : ""
              )}
            >
              <div className="py-12 md:py-16 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between z-10 relative">
                
                {/* Left: Number + Title */}
                <div className="flex items-center gap-8 md:gap-16 w-full md:w-1/3 mb-8 md:mb-0">
                  <span className="font-mono text-xl md:text-2xl text-[#52525B] group-hover:text-[#050505] transition-colors">
                    {item.id}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#050505] tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Middle: Desc + Tech */}
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                  <p className="text-[#52525B] text-lg md:text-xl font-light leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {item.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-[#F4F4F5] border border-[rgba(0,0,0,0.05)] rounded-full font-mono text-[10px] text-[#52525B] tracking-wider uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Arrow */}
                <div className="hidden md:flex justify-end w-1/6">
                  <div className="w-16 h-16 rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group-hover:bg-black group-hover:text-white text-[#050505] transition-all duration-300">
                    <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" />
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
                    className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center pointer-events-none opacity-20"
                  >
                    <item.icon size={200} strokeWidth={0.5} className="text-[#050505] transform translate-x-1/4" />
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
