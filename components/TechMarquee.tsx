"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js", "React", "TypeScript", "Python", "FastAPI", "Firebase", "Supabase", "AI", "Cloud",
  "Next.js", "React", "TypeScript", "Python", "FastAPI", "Firebase", "Supabase", "AI", "Cloud"
];

export default function TechMarquee() {
  return (
    <div className="relative z-30 -mt-16 sm:-mt-20 w-full max-w-[95%] sm:max-w-6xl mx-auto">
      <div className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.08)] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch">
          
          <div className="px-6 py-4 sm:py-6 border-b sm:border-b-0 sm:border-r border-[rgba(0,0,0,0.08)] bg-[#FFFFFF] flex items-center shrink-0">
            <span className="font-mono text-xs tracking-[0.2em] text-[#52525B] uppercase">
              Engineered With
            </span>
          </div>

          <div className="flex-1 overflow-hidden flex items-center relative py-4 sm:py-0 bg-transparent mask-image-linear">
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />
            
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex whitespace-nowrap"
            >
              <div className="flex items-center">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-sm font-mono text-[#050505] px-6 sm:px-8 tracking-wider">{tech}</span>
                    <span className="text-[#333] text-xs">/</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
