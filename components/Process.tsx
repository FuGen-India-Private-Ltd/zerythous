"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: "01", title: "DISCOVER", desc: "We analyze your business requirements, technical constraints, and user needs." },
  { id: "02", title: "ARCHITECT", desc: "We design the system architecture, select the right tech stack, and plan the data flow." },
  { id: "03", title: "DESIGN", desc: "We create premium user interfaces and map out the entire user experience journey." },
  { id: "04", title: "BUILD", desc: "Our engineers write production-ready code, integrating AI and complex logic." },
  { id: "05", title: "LAUNCH", desc: "We deploy, test, and scale the product, ensuring high performance." },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-32 md:py-48 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 md:mb-32">
          <p className="font-mono text-xs tracking-widest text-[#52525B] uppercase mb-8">
            05 / Process
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-medium tracking-tight text-[#050505] leading-none">
            FROM IDEA <br />
            <span className="text-[#52525B]">TO PRODUCTION.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Vertical Timeline (Mobile) / Horizontal (Desktop approach but vertical is often better for this UI if horizontal doesn't fit well) */}
          {/* We will do a vertical interactive layout which looks premium */}
          <div className="w-full lg:w-1/2 flex flex-col relative">
            <div className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-px bg-[rgba(0,0,0,0.1)]" />
            
            {steps.map((step, idx) => (
              <div 
                key={step.id}
                className="relative pl-10 md:pl-16 py-6 cursor-pointer group"
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
              >
                {/* Active indicator line */}
                {activeStep === idx && (
                  <motion.div
                    layoutId="activeProcessLine"
                    className="absolute left-0 top-6 bottom-6 w-1.5 md:w-2 bg-black rounded-full z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Dot */}
                <div className={cn(
                  "absolute left-[-2px] md:left-0 top-10 w-2.5 h-2.5 rounded-full transition-colors duration-300 z-0",
                  activeStep === idx ? "bg-black" : "bg-[#333] group-hover:bg-[#555]"
                )} />
                
                <h3 className={cn(
                  "text-3xl md:text-5xl font-medium tracking-tight transition-colors duration-300",
                  activeStep === idx ? "text-[#050505]" : "text-[#52525B] group-hover:text-[#52525B]"
                )}>
                  <span className="font-mono text-sm md:text-lg mr-4 opacity-50">{step.id}</span>
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
            <div className="w-full max-w-md h-[300px] bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-xl p-10 flex flex-col justify-center relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="font-mono text-xs text-[#050505] mb-6 uppercase tracking-widest bg-[rgba(0,0,0,0.1)] px-3 py-1 inline-block rounded">
                  PHASE {steps[activeStep].id}
                </div>
                <h4 className="text-2xl font-medium text-[#050505] mb-4">{steps[activeStep].title}</h4>
                <p className="text-[#52525B] text-lg font-light leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
