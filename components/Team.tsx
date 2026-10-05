"use client";

import { motion } from "framer-motion";
import { Mail, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const teamMembers = [
  {
    id: "01",
    name: "AKASH R",
    initials: "AR",
    role: "SOFTWARE & AI ENGINEERING",
    metaNode: "SYSTEM NODE 01",
    metaTag: "SOFTWARE / AI",
    description: "Builds full-stack products, AI systems, and scalable web applications with a focus on engineering quality and product experience.",
    linkedin: "https://www.linkedin.com/in/theakashr/",
    github: "https://github.com/theakashr",
    email: "akashakashr505@gmail.com"
  },
  {
    id: "02",
    name: "ADARSH B A",
    initials: "AB",
    role: "SYSTEMS & BACKEND ENGINEERING",
    metaNode: "SYSTEM NODE 02",
    metaTag: "BACKEND / ARCHITECTURE",
    description: "Focused on system architecture, backend engineering, technical problem solving, and building reliable foundations for complex products.",
    linkedin: "https://www.linkedin.com/in/developeradhi/",
    github: "https://github.com/developeradhi",
    email: "adhipvt2203@gmail.com"
  },
  {
    id: "03",
    name: "AKSHATH C H",
    initials: "ACH",
    role: "PRODUCT & UI/UX",
    metaNode: "SYSTEM NODE 03",
    metaTag: "PRODUCT / UX",
    description: "Focused on product thinking, interface design, user experience, and transforming complex technology into intuitive digital experiences.",
    linkedin: "https://www.linkedin.com/in/theakshathch/",
    github: "https://github.com/theakshath",
    email: "akshathch567@gmail.com"
  },
  {
    id: "04",
    name: "AKASH P",
    initials: "AP",
    role: "CLIENT SOLUTIONS & GROWTH",
    metaNode: "SYSTEM NODE 04",
    metaTag: "SOLUTIONS / GROWTH",
    description: "Focused on understanding client requirements, translating business problems into technology solutions, and shaping products from concept to execution.",
    linkedin: "https://www.linkedin.com/in/theakashp/",
    github: "https://github.com/developerakashp",
    email: "akash19112@gmail.com"
  }
];

export default function Team() {
  return (
    <section id="about" className="py-24 md:py-40 bg-[#F7F7F5] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <p className="font-mono text-xs tracking-widest text-[#71717A] uppercase mb-8">
            04 / THE TEAM
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-medium tracking-tight text-[#09090B] leading-[1.1] font-heading mb-6">
            FOUR MINDS. <br />
            <span className="text-accent-purple">ONE SYSTEM.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#52525B] font-light max-w-2xl leading-relaxed">
            Different disciplines. Shared ownership. One standard for building technology that actually works.
          </p>
        </div>

        {/* Network & Grid Wrapper */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Subtle network lines behind the grid - hidden on mobile */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            {/* Horizontal cross line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[rgba(0,0,0,0.06)] -translate-y-1/2" />
            {/* Vertical cross line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[rgba(0,0,0,0.06)] -translate-x-1/2" />
            
            {/* Central Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex flex-col items-center justify-center bg-[#F7F7F5] border border-[rgba(0,0,0,0.08)] rounded-full z-10">
              <motion.div 
                className="absolute inset-0 rounded-full border border-accent-purple/20 bg-accent-purple/5"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <Network size={20} className="text-[#09090B] mb-2 opacity-50" />
              <span className="font-mono text-[8px] font-bold tracking-widest text-[#09090B] text-center">ZERYTHOUS<br/>SHARED<br/>SYSTEM</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 relative z-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.15 }}
                className="group relative bg-[#FAFAF9] border border-[rgba(0,0,0,0.08)] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
              >
                {/* Subtle purple accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                
                {/* Header (ID + Brand) */}
                <div className="flex justify-between items-center px-8 pt-8 pb-4">
                  <span className="font-mono text-[10px] text-[#71717A]">{member.id}</span>
                  <span className="font-mono text-[10px] text-[#71717A] tracking-widest">ZERYTHOUS</span>
                </div>

                {/* Identity Visualization */}
                <div className="px-8 pb-8">
                  <div className="w-full aspect-[2/1] border border-[rgba(0,0,0,0.06)] rounded-xl bg-[#F7F7F5] relative overflow-hidden flex items-center justify-center group-hover:border-accent-purple/30 transition-colors duration-500">
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                    
                    {/* Scanning Line */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent shadow-[0_0_10px_rgba(37,99,235,0.2)]"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Initials & Glow */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="absolute inset-0 bg-accent-purple/20 blur-2xl rounded-full scale-50 group-hover:scale-150 group-hover:bg-accent-purple/30 transition-all duration-700" />
                      <span className="text-5xl font-medium tracking-tighter text-[#09090B] font-heading relative z-10">{member.initials}</span>
                    </div>

                    {/* Technical Overlays (Visible on Hover) */}
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-[8px] text-accent-purple tracking-widest uppercase block">{member.metaNode}</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-[8px] text-accent-blue tracking-widest uppercase">{member.metaTag}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-medium text-[#09090B] mb-2 font-heading tracking-tight">{member.name}</h3>
                  <p className="font-mono text-[10px] text-[#71717A] tracking-widest uppercase mb-6 pb-6 border-b border-[rgba(0,0,0,0.06)]">{member.role}</p>
                  
                  <p className="text-sm text-[#52525B] leading-relaxed mb-8 flex-1 font-light">
                    {member.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#09090B] hover:text-accent-purple transition-colors">
                      <LinkedinIcon size={18} />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-[#09090B] hover:text-accent-purple transition-colors">
                      <GithubIcon size={18} />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-[#09090B] hover:text-accent-purple transition-colors ml-auto flex items-center gap-2 font-mono text-[10px] tracking-widest">
                      <Mail size={16} /> <span className="hidden sm:inline">EMAIL</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Typography Block */}
        <div className="mt-32 pt-16 border-t border-[rgba(0,0,0,0.08)] flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center max-w-4xl"
          >
            {["ENGINEERING", "+", "SYSTEMS", "+", "PRODUCT", "+", "GROWTH"].map((item, idx) => (
              <span key={idx} className={cn(
                "font-heading font-medium tracking-tight",
                item === "+" ? "text-xl text-[rgba(0,0,0,0.2)] mx-2" : "text-xl md:text-3xl text-[#52525B]"
              )}>
                {item}
              </span>
            ))}
            <span className="text-xl text-accent-purple mx-2 font-medium">=</span>
            <span className="text-xl md:text-3xl font-medium tracking-tight text-[#09090B] font-heading">ZERYTHOUS</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
