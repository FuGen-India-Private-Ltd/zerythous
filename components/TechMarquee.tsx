"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js 16", "React 19", "TypeScript", "Python", "FastAPI", "Supabase RLS", "PostgreSQL",
  "LangChain", "Gemini 2.0", "OpenAI Swarm", "Pinecone Vector DB", "Redis", "Resend", "Vercel Edge",
  "Docker", "AWS", "WebSockets", "Kafka", "PostGIS",
  "Next.js 16", "React 19", "TypeScript", "Python", "FastAPI", "Supabase RLS", "PostgreSQL",
  "LangChain", "Gemini 2.0", "OpenAI Swarm", "Pinecone Vector DB", "Redis", "Resend", "Vercel Edge"
];

export default function TechMarquee() {
  return (
    <div className="relative z-30 -mt-10 sm:-mt-14 w-full max-w-[95%] sm:max-w-6xl mx-auto">
      <div className="bg-white/90 dark:bg-neutral-950/80 border border-black/[0.08] dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl shadow-black/5 dark:shadow-black/90 backdrop-blur-xl overflow-hidden transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-stretch">
          
          <div className="px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-black/[0.08] dark:border-white/10 bg-neutral-100/60 dark:bg-neutral-900/60 flex items-center shrink-0">
            <span className="font-mono text-xs tracking-[0.2em] text-accent-purple font-bold uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              Production Stack
            </span>
          </div>

          <div className="flex-1 overflow-hidden flex items-center relative py-4 sm:py-0 bg-transparent">
            {/* Gradient masks for smooth fading edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
              className="flex whitespace-nowrap"
            >
              <div className="flex items-center">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-xs sm:text-sm font-mono text-[#52525B] hover:text-[#09090B] dark:text-neutral-300 dark:hover:text-white px-5 sm:px-7 tracking-wider transition-colors">
                      {tech}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700 text-xs">/</span>
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
