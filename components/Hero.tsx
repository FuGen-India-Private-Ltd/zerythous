"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const nodes = [
  { id: "ai", label: "AI", status: "ACTIVE", desc: "MODEL PIPELINE / GEMINI / RAG / AGENTS", x: 10, y: 20 },
  { id: "api", label: "API", status: "ONLINE", desc: "FASTAPI / REST / GRAPHQL", x: 80, y: 25 },
  { id: "data", label: "DATA", status: "SYNCED", desc: "POSTGRES / SUPABASE / REDIS", x: 15, y: 70 },
  { id: "web", label: "WEB", status: "READY", desc: "NEXT.JS 16 / REACT 19", x: 85, y: 75 },
  { id: "cloud", label: "CLOUD", status: "SCALING", desc: "VERCEL / AWS / KUBERNETES", x: 50, y: 90 },
  { id: "realtime", label: "REAL-TIME", status: "STREAMING", desc: "WEBSOCKETS / PUBSUB", x: 45, y: 10 },
  { id: "automation", label: "AUTOMATION", status: "RUNNING", desc: "BACKGROUND WORKERS / CRON", x: 100, y: 50 },
];

const highlights = [
  { label: "Client IP Ownership", value: "100%", sub: "Full Source & Infra" },
  { label: "Systems Deployed", value: "6+", sub: "AI & Full-Stack Apps" },
  { label: "Performance Standard", value: "95+", sub: "Lighthouse & Latency" },
];

export default function Hero() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-background">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-accent-purple/10 via-accent-blue/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* LEFT 48% */}
          <div className="w-full lg:w-[48%] flex flex-col relative z-20 mt-12 md:mt-0">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 border border-[rgba(0,0,0,0.08)] shadow-sm backdrop-blur-md mb-8 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs tracking-wider text-[#52525B] uppercase font-medium">
                AVAILABLE FOR NEW CLIENT COMMISSIONS // 2026
              </span>
            </motion.div>

            <motion.h1 
              className="text-[12vw] sm:text-7xl md:text-[85px] lg:text-[96px] leading-[0.92] tracking-tighter mb-8 font-medium font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#09090B]">WE BUILD</span><br/>
              <span className="text-accent-purple">SYSTEMS</span><br/>
              <span className="text-[#09090B]">THAT MOVE</span><br/>
              <span className="text-[#09090B]">BUSINESS.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <p className="text-lg md:text-xl text-[#52525B] max-w-lg mb-10 font-light leading-relaxed">
                We architect custom high-performance software, intelligent AI systems, and scalable digital platforms for founders, teams, and high-growth enterprises.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14"
            >
              <Link
                href="#project-builder"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-[#09090B] text-white text-xs font-mono font-medium tracking-widest rounded-full hover:bg-accent-purple transition-all duration-300 shadow-lg hover:shadow-accent-purple/20 group"
              >
                START A PROJECT
                <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="#work"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-transparent text-[#09090B] text-xs font-mono font-medium tracking-widest border border-[rgba(0,0,0,0.15)] rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-all duration-300"
              >
                EXPLORE CASE STUDIES
              </Link>
            </motion.div>

            {/* Metrics Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 border-t border-[rgba(0,0,0,0.08)] grid grid-cols-3 gap-4"
            >
              {highlights.map((h, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-heading text-2xl md:text-3xl font-semibold text-[#09090B] tracking-tight">{h.value}</span>
                  <span className="font-mono text-[10px] text-[#52525B] uppercase tracking-wider mt-0.5">{h.label}</span>
                  <span className="text-[10px] text-[#71717A] mt-0.5">{h.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT 52% - Zerythous System Core */}
          <div className="w-full lg:w-[52%] h-[500px] lg:h-[700px] relative flex items-center justify-center">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-purple/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="relative w-full max-w-[600px] aspect-square"
            >
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {nodes.map((node, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke="rgba(0,0,0,0.05)"
                    strokeWidth="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Center System Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[rgba(0,0,0,0.1)] border-t-accent-purple/50 border-r-accent-blue/30 flex items-center justify-center animate-spin-slow absolute" />
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[rgba(0,0,0,0.05)] border-b-black/20 animate-reverse-spin absolute" />
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-[rgba(0,0,0,0.1)] rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(124,58,237,0.1)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent-purple/10 animate-pulse" />
                  <span className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#09090B] z-10 text-center leading-tight mt-1 font-bold">
                    ZERYTHOUS<br />CORE
                  </span>
                </div>
              </div>

              {/* Satellite System Nodes */}
              {nodes.map((node) => {
                const isHovered = hoveredNode === node.id;
                return (
                  <motion.div
                    key={node.id}
                    className="absolute z-20 group cursor-default"
                    style={{
                      top: `${node.y}%`,
                      left: `${node.x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="relative">
                      <div className={cn(
                        "flex flex-col items-center p-3 rounded-lg border backdrop-blur-md transition-all duration-300",
                        isHovered 
                          ? "bg-white border-accent-purple shadow-[0_4px_20px_rgba(124,58,237,0.15)] scale-110 z-30" 
                          : "bg-white/60 border-[rgba(0,0,0,0.08)] z-20 hover:bg-white/90"
                      )}>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-semibold text-[#09090B]">{node.label}</span>
                          <span className="text-[10px] font-mono text-[#52525B]">/</span>
                          <span className={cn(
                            "font-mono text-[10px] tracking-wider",
                            isHovered ? "text-accent-purple font-medium" : "text-[#52525B]"
                          )}>
                            {node.status}
                          </span>
                        </div>

                        {/* Dropdown description */}
                        <div className={cn(
                          "overflow-hidden transition-all duration-300 w-max text-center",
                          isHovered ? "max-h-12 opacity-100 mt-2" : "max-h-0 opacity-0"
                        )}>
                          <span className="text-[10px] text-accent-purple font-mono font-medium">
                            {node.desc}
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full pointer-events-none -z-10" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
