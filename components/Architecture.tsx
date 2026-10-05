"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const layers = [
  { id: "user", label: "USER", meta: "Client browsers, Mobile apps, External systems" },
  { id: "product", label: "PRODUCT", meta: "Next.js, React, Tailwind, Framer Motion" },
  { id: "api", label: "API", meta: "REST, GraphQL, tRPC, WebSockets" },
  { id: "logic", label: "LOGIC", meta: "Node.js, Python, Go, Rust" },
  { id: "ai", label: "AI", meta: "OpenAI, Anthropic, Custom Agents, RAG" },
  { id: "data", label: "DATA", meta: "PostgreSQL, Redis, Pinecone, Firebase" },
  { id: "infra", label: "INFRASTRUCTURE", meta: "AWS, Vercel, Docker, Kubernetes" },
];

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF] border-y border-[rgba(0,0,0,0.05)] relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Blueprint background lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <div className="w-full lg:w-1/2">
          <p className="font-mono text-xs tracking-widest text-accent-purple uppercase mb-8">
            04 / Architecture
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#050505] mb-8">
            GOOD SOFTWARE <br />
            STARTS WITH <br />
            <span className="text-[#52525B]">GOOD ARCHITECTURE.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#52525B] font-light max-w-md">
            We don&apos;t just write code. We design systems that scale, remain secure, and perform beautifully under pressure.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-lg flex flex-col gap-3 relative">
            
            {/* Connecting background line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(0,0,0,0.05)] -translate-x-1/2 -z-10" />

            {layers.map((layer, idx) => (
              <div key={layer.id} className="relative group w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                  className={cn(
                    "w-full py-4 px-8 bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-sm cursor-pointer transition-all duration-300 flex items-center justify-between",
                    activeLayer === layer.id ? "border-accent-purple/50 bg-[#FAFAFA] shadow-[0_0_20px_rgba(139,92,246,0.1)] scale-[1.02] z-10" : "hover:border-[rgba(0,0,0,0.2)]"
                  )}
                >
                  <span className={cn(
                    "font-mono text-sm tracking-widest transition-colors",
                    activeLayer === layer.id ? "text-accent-purple font-bold" : "text-[#52525B]"
                  )}>
                    {layer.label}
                  </span>
                  
                  <AnimatePresence>
                    {activeLayer === layer.id && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-mono text-[10px] text-[#050505] bg-[rgba(0,0,0,0.05)] px-3 py-1 rounded"
                      >
                        {layer.meta}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Arrow pointing down except for last item */}
                {idx < layers.length - 1 && (
                  <div className="h-4 flex justify-center items-center pointer-events-none">
                    <div className={cn(
                      "w-0.5 h-full transition-colors duration-300",
                      activeLayer === layer.id || activeLayer === layers[idx+1].id ? "bg-accent-purple" : "bg-transparent"
                    )} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
