"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const nodes = [
  { id: "ai", label: "AI", status: "ACTIVE", desc: "MODEL PIPELINE / GEMINI / RAG / AGENTS", x: 10, y: 20 },
  { id: "api", label: "API", status: "ONLINE", desc: "FASTAPI / REST", x: 80, y: 25 },
  { id: "data", label: "DATA", status: "SYNCED", desc: "POSTGRES / FIREBASE", x: 15, y: 70 },
  { id: "web", label: "WEB", status: "READY", desc: "NEXT.JS / REACT", x: 85, y: 75 },
  { id: "cloud", label: "CLOUD", status: "SCALING", desc: "VERCEL / AWS / KUBERNETES", x: 50, y: 90 },
  { id: "realtime", label: "REAL-TIME", status: "STREAMING", desc: "WEBSOCKETS / REDIS", x: 45, y: 10 },
  { id: "automation", label: "AUTOMATION", status: "RUNNING", desc: "BACKGROUND WORKERS / CRON", x: 100, y: 50 },
];

export default function Hero() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-background">
      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* LEFT 48% */}
          <div className="w-full lg:w-[48%] flex flex-col relative z-20 mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#52525B] uppercase mb-6 md:mb-10 flex items-center">
                ZERYTHOUS
                <span className="w-4 h-[1px] bg-[rgba(0,0,0,0.2)] mx-4" />
                SOFTWARE + AI SYSTEMS
              </p>
            </motion.div>

            <motion.h1 
              className="text-[12vw] sm:text-7xl md:text-[85px] lg:text-[100px] leading-[0.9] tracking-tighter mb-8 font-medium font-heading"
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
              <p className="text-lg md:text-xl text-[#52525B] max-w-lg mb-12 font-light leading-relaxed">
                We architect high-performance software, intelligent AI systems, and digital products for ambitious teams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16"
            >
              <Link
                href="#project-builder"
                className="flex items-center justify-center px-8 py-4 bg-[#09090B] text-white text-sm font-medium tracking-wide rounded-full hover:bg-accent-purple transition-all duration-300"
              >
                START A PROJECT
              </Link>
              <Link
                href="#work"
                className="flex items-center justify-center px-8 py-4 bg-transparent text-[#09090B] text-sm font-medium tracking-wide border border-[rgba(0,0,0,0.15)] rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-all duration-300"
              >
                EXPLORE OUR WORK
              </Link>
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
                    stroke={hoveredNode === node.id ? "rgba(124, 58, 237, 0.4)" : "rgba(0,0,0,0.05)"}
                    strokeWidth="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 + (i * 0.1) }}
                  />
                ))}
              </svg>

              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[rgba(0,0,0,0.1)] border-t-accent-purple/50 border-r-accent-blue/30 flex items-center justify-center absolute"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[rgba(0,0,0,0.05)] border-b-black/20 absolute"
                />
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-[rgba(0,0,0,0.1)] rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(124,58,237,0.1)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent-purple/10 animate-pulse" />
                  <span className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#09090B] z-10 text-center leading-tight mt-1">ZERYTHOUS<br/>CORE</span>
                </div>
              </div>

              {/* Orbiting Nodes */}
              {nodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + (i * 0.1) }}
                  className="absolute z-20 group cursor-default"
                  style={{ top: `${node.y}%`, left: `${node.x}%`, x: "-50%", y: "-50%" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="relative">
                    <div className={cn(
                      "flex flex-col items-center p-3 rounded-lg border backdrop-blur-md transition-all duration-300",
                      hoveredNode === node.id 
                        ? "bg-white/90 border-accent-purple/30 shadow-[0_0_20px_rgba(124,58,237,0.1)] z-30 scale-110" 
                        : "bg-white/60 border-[rgba(0,0,0,0.08)] z-20"
                    )}>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-medium text-[#09090B]">{node.label}</span>
                        <span className="text-[10px] font-mono text-[#52525B]">/</span>
                        <span className="font-mono text-[10px] tracking-wider text-[#52525B]">{node.status}</span>
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className={cn(
                        "overflow-hidden transition-all duration-300 w-max text-center",
                        hoveredNode === node.id ? "h-6 mt-1 opacity-100" : "h-0 opacity-0"
                      )}>
                        <span className="text-[10px] text-accent-purple font-mono">{node.desc}</span>
                      </div>
                    </div>
                    {/* Node connector dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full pointer-events-none -z-10" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
