"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

const architectureLayers = [
  { 
    id: "user", 
    label: "USER", 
    details: "End-user devices, enterprise systems, and third-party integrations."
  },
  { 
    id: "frontend", 
    label: "WEB / MOBILE", 
    details: "Next.js / React / React Native. Highly optimized, accessible, and interactive interfaces."
  },
  { 
    id: "api", 
    label: "API LAYER", 
    details: "REST APIs / Authentication / Real-Time Services / Integrations."
  },
  { 
    id: "logic", 
    label: "BUSINESS LOGIC", 
    details: "Node.js / Python / Go. Core product rules, microservices, and workflows."
  },
  { 
    id: "ai", 
    label: "AI / AGENTS", 
    details: "Multi-Agent Systems / RAG Pipelines / AI Automation / Model Integration / Evaluation."
  },
  { 
    id: "data", 
    label: "DATABASE", 
    details: "PostgreSQL / Redis / Vector DBs. Scalable, secure, and highly available data storage."
  },
  { 
    id: "cloud", 
    label: "CLOUD INFRASTRUCTURE", 
    details: "Deployment / Scaling / Monitoring / Security on AWS, Vercel, and Kubernetes."
  },
];

const pipelineSteps = [
  "01 DISCOVER",
  "02 ARCHITECT",
  "03 BUILD",
  "04 INTEGRATE",
  "05 DEPLOY",
  "06 SCALE"
];

export default function Introduction() {
  const [activeLayer, setActiveLayer] = useState<string | null>("ai");

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF9] border-y border-[rgba(0,0,0,0.05)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20">
          <p className="font-mono text-xs tracking-widest text-[#71717A] uppercase mb-6">
            01 / WHAT WE ENGINEER
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-medium tracking-tighter text-[#09090B] leading-[1.1] max-w-4xl font-heading">
            FROM IDEA <br />
            TO PRODUCTION <br />
            <span className="text-accent-purple">SYSTEM.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT: Pipeline */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h3 className="font-mono text-[10px] text-[#71717A] tracking-widest uppercase mb-8 border-b border-[rgba(0,0,0,0.1)] pb-4">
              SYSTEM PIPELINE
            </h3>
            <div className="flex flex-col gap-6">
              {pipelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-[rgba(0,0,0,0.1)] group-hover:bg-accent-purple transition-colors" />
                  <span className="font-mono text-sm tracking-wider text-[#52525B] group-hover:text-[#09090B] transition-colors font-medium">
                    {step}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-6 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-purple/5 rounded-bl-full pointer-events-none" />
              <p className="text-sm text-[#52525B] leading-relaxed relative z-10">
                We design comprehensive architectures that ensure your product scales seamlessly from Day 1 to Day 1000.
              </p>
            </div>
          </div>

          {/* RIGHT: Architecture Board */}
          <div className="w-full lg:w-2/3">
            <h3 className="font-mono text-[10px] text-[#71717A] tracking-widest uppercase mb-8 border-b border-[rgba(0,0,0,0.1)] pb-4">
              INTERACTIVE ARCHITECTURE BOARD
            </h3>
            
            <div className="w-full flex flex-col items-center max-w-lg mx-auto relative">
              {architectureLayers.map((layer, idx) => (
                <div key={layer.id} className="w-full flex flex-col items-center">
                  <button
                    onClick={() => setActiveLayer(layer.id === activeLayer ? null : layer.id)}
                    className={cn(
                      "w-full py-4 px-6 md:px-8 bg-white border rounded-lg transition-all duration-300 relative text-left overflow-hidden group",
                      activeLayer === layer.id 
                        ? "border-accent-purple/50 shadow-[0_4px_20px_rgba(124,58,237,0.1)] scale-[1.02] z-10" 
                        : "border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] hover:bg-[#FAFAF9]"
                    )}
                  >
                    {activeLayer === layer.id && (
                      <motion.div layoutId="activeArchLayer" className="absolute left-0 top-0 bottom-0 w-1 bg-accent-purple" />
                    )}
                    
                    <span className={cn(
                      "font-mono text-sm md:text-base tracking-widest font-semibold transition-colors",
                      activeLayer === layer.id ? "text-accent-purple" : "text-[#09090B]"
                    )}>
                      {layer.label}
                    </span>
                    
                    <AnimatePresence>
                      {activeLayer === layer.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <div className="w-full h-px bg-[rgba(0,0,0,0.05)] mb-4" />
                          <p className="text-sm text-[#52525B] font-mono leading-relaxed">
                            {layer.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Animated moving packets in the background of the button */}
                    {activeLayer === layer.id && (
                      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="w-1/2 h-full bg-gradient-to-r from-transparent via-accent-purple to-transparent"
                        />
                      </div>
                    )}
                  </button>
                  
                  {idx < architectureLayers.length - 1 && (
                    <div className="h-6 flex justify-center items-center relative z-0">
                      <div className="w-0.5 h-full bg-[rgba(0,0,0,0.1)]" />
                      <ArrowDown size={12} className="text-[rgba(0,0,0,0.2)] absolute bottom-0 bg-[#FAFAF9]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
