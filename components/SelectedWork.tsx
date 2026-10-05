"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Activity, ShieldAlert, Zap, Search, ChevronRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 md:py-48 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 md:mb-40">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest text-[#52525B] uppercase mb-8"
          >
            02 / Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-[100px] font-medium tracking-tight text-[#050505] leading-none"
          >
            Built for the <span className="text-[#52525B]">real world.</span>
          </motion.h2>
        </div>

        <div className="space-y-32 md:space-y-48">
          
          {/* PROJECT 1: RescueAI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group flex flex-col lg:flex-row gap-12 lg:gap-0"
          >
            <div className="w-full lg:w-[70%] lg:pr-16 relative">
              <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[16/10] bg-[#FAFAFA] rounded-xl border border-[rgba(0,0,0,0.08)] overflow-hidden relative group-hover:border-[rgba(0,0,0,0.15)] transition-colors duration-500 flex flex-col">
                {/* Mock UI Header */}
                <div className="h-10 border-b border-[rgba(0,0,0,0.08)] bg-[#FFFFFF] flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  <div className="ml-auto flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-[#52525B]">LIVE TELEMETRY</span>
                  </div>
                </div>
                {/* Mock UI Body */}
                <div className="flex-1 relative flex">
                  {/* Left panel - incidents */}
                  <div className="hidden sm:block w-48 border-r border-[rgba(0,0,0,0.08)] p-4 bg-[#FAFAFA]">
                    <div className="h-4 w-20 bg-[rgba(0,0,0,0.1)] rounded mb-4" />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="mb-3 p-3 bg-[#FAFAFA] border border-[rgba(0,0,0,0.05)] rounded-md flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="h-2 w-12 bg-red-500/50 rounded" />
                          <div className="h-2 w-6 bg-[rgba(0,0,0,0.2)] rounded" />
                        </div>
                        <div className="h-2 w-full bg-[rgba(0,0,0,0.1)] rounded" />
                        <div className="h-2 w-2/3 bg-[rgba(0,0,0,0.1)] rounded" />
                      </div>
                    ))}
                  </div>
                  {/* Main map area */}
                  <div className="flex-1 bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center">
                    {/* Abstract map lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0 50 Q 25 30 50 60 T 100 40" stroke="black" fill="none" strokeWidth="0.5" />
                      <path d="M0 20 Q 30 50 60 20 T 100 70" stroke="black" fill="none" strokeWidth="0.5" />
                      <path d="M30 0 L 40 100" stroke="rgba(0,0,0,0.5)" fill="none" strokeWidth="0.2" strokeDasharray="2 2" />
                      <path d="M70 0 L 60 100" stroke="rgba(0,0,0,0.5)" fill="none" strokeWidth="0.2" strokeDasharray="2 2" />
                    </svg>
                    
                    {/* Markers */}
                    <div className="absolute top-1/3 left-1/3 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-500/10 rounded-full animate-ping absolute" />
                      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#030303] z-10" />
                      <div className="absolute top-full mt-2 bg-[#F4F4F5] border border-[rgba(0,0,0,0.1)] px-3 py-1.5 rounded-md flex items-center gap-2">
                        <ShieldAlert size={12} className="text-red-500" />
                        <span className="text-[10px] font-mono text-[#050505]">CRITICAL</span>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-1/4 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-[#030303] z-10" />
                      <div className="absolute left-full ml-2 bg-[#F4F4F5] border border-[rgba(0,0,0,0.1)] px-2 py-1 rounded text-[10px] font-mono text-[#050505] whitespace-nowrap">
                        UNIT-04
                      </div>
                    </div>

                    {/* Overlay labels */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <div className="px-2 py-1 bg-#FFFFFF/50 border border-[rgba(0,0,0,0.1)] rounded backdrop-blur-md text-[9px] font-mono text-[#050505]">OFFLINE-FIRST</div>
                      <div className="px-2 py-1 bg-#FFFFFF/50 border border-[rgba(0,0,0,0.1)] rounded backdrop-blur-md text-[9px] font-mono text-[#050505]">AI TRIAGE</div>
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay scale effect */}
                <motion.div 
                  className="absolute inset-0 bg-black/[0.02] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-[30%] flex flex-col justify-center">
              <div className="mb-6">
                <p className="font-mono text-xs text-accent-purple mb-4 uppercase tracking-widest">AI / Emergency Response</p>
                <h3 className="text-3xl md:text-5xl font-medium text-[#050505] mb-6">RescueAI</h3>
                <p className="text-lg text-[#52525B] leading-relaxed font-light mb-10">
                  An offline-first AI-powered disaster response and emergency coordination ecosystem.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a href="https://rescueai-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-4 border border-[rgba(0,0,0,0.15)] rounded-md hover:bg-black hover:text-white text-[#050505] transition-all duration-300 group/btn">
                  <span className="font-medium text-sm tracking-wide">VIEW LIVE PROJECT</span>
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
                <a href="https://github.com/FuGen-India-Private-Ltd/rescue-ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-4 border border-[rgba(0,0,0,0.08)] rounded-md hover:bg-[rgba(0,0,0,0.05)] text-[#52525B] hover:text-[#050505] transition-all duration-300">
                  <span className="font-medium text-sm tracking-wide">VIEW GITHUB</span>
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>


          {/* PROJECT 2: ResumeAI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group flex flex-col lg:flex-row-reverse gap-12 lg:gap-0"
          >
            <div className="w-full lg:w-[65%] lg:pl-16 relative">
              <div className="w-full aspect-[4/3] sm:aspect-video bg-[#FFFFFF] rounded-xl relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                {/* Floating SaaS Interface */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[80%] bg-[#FAFAFA] border border-[rgba(0,0,0,0.1)] rounded-lg shadow-2xl flex p-4 gap-4">
                  
                  {/* Resume preview */}
                  <div className="flex-1 bg-black rounded flex flex-col p-4 opacity-90 shadow-inner">
                    <div className="w-1/2 h-6 bg-gray-200 rounded mb-2" />
                    <div className="w-1/3 h-3 bg-gray-100 rounded mb-6" />
                    <div className="w-full h-3 bg-gray-100 rounded mb-2" />
                    <div className="w-full h-3 bg-gray-100 rounded mb-2" />
                    <div className="w-5/6 h-3 bg-gray-100 rounded mb-6" />
                    <div className="w-1/4 h-4 bg-gray-200 rounded mb-3" />
                    <div className="w-full h-3 bg-gray-100 rounded mb-2" />
                    <div className="w-full h-3 bg-gray-100 rounded mb-2" />
                  </div>

                  {/* Sidebar - ATS Score & AI */}
                  <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-[#F4F4F5] border border-accent-purple/20 p-4 rounded-md flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent-purple/5" />
                      <span className="text-[10px] text-[#52525B] font-mono mb-2">ATS MATCH</span>
                      <span className="text-3xl font-medium text-[#050505]">94%</span>
                    </div>
                    
                    <div className="flex-1 bg-[#F4F4F5] border border-[rgba(0,0,0,0.05)] p-3 rounded-md flex flex-col gap-3">
                      <span className="text-[10px] text-accent-blue font-mono">AI INSIGHTS</span>
                      <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1 shrink-0" />
                        <div className="h-2 w-full bg-[rgba(0,0,0,0.1)] rounded mt-1" />
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1 shrink-0" />
                        <div className="h-2 w-4/5 bg-[rgba(0,0,0,0.1)] rounded mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[35%] flex flex-col justify-center">
              <div className="mb-6">
                <p className="font-mono text-xs text-accent-blue mb-4 uppercase tracking-widest">AI / Career Intelligence</p>
                <h3 className="text-3xl md:text-5xl font-medium text-[#050505] mb-6">ResumeAI</h3>
                <p className="text-lg text-[#52525B] leading-relaxed font-light mb-10">
                  Intelligent resume building with real-time ATS scoring, AI recommendations, and career insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://resume-app-ten-nu.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-4 border border-[rgba(0,0,0,0.15)] rounded-md hover:bg-black hover:text-white text-[#050505] transition-all duration-300">
                  <span className="font-medium text-sm tracking-wide mr-2">LIVE</span>
                  <ExternalLink size={16} />
                </a>
                <a href="https://github.com/theakashr/Ai-Resume-Builder" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-4 border border-[rgba(0,0,0,0.08)] rounded-md hover:bg-[rgba(0,0,0,0.05)] text-[#52525B] hover:text-[#050505] transition-all duration-300">
                  <span className="font-medium text-sm tracking-wide mr-2">GITHUB</span>
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>


          {/* PROJECT 3: AI Support Triage Agent */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group flex flex-col lg:flex-row gap-12 lg:gap-0"
          >
            <div className="w-full lg:w-[60%] lg:pr-16 relative">
              <div className="w-full aspect-[4/3] sm:aspect-video bg-[#FFFFFF] rounded-xl border border-[rgba(0,0,0,0.08)] p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[rgba(0,0,0,0.15)] transition-colors duration-500">
                {/* Tech architecture presentation */}
                <div className="flex flex-col items-center w-full max-w-sm gap-3">
                  <div className="px-4 py-2 border border-[rgba(0,0,0,0.1)] bg-[#FAFAFA] rounded-md text-xs font-mono text-[#050505] flex items-center justify-between w-full">
                    <span>TICKET INGESTION</span>
                    <ArrowDown size={14} className="text-[#52525B]" />
                  </div>
                  <div className="w-px h-4 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-transparent" />
                  
                  <div className="px-4 py-2 border border-accent-purple/30 bg-accent-purple/5 rounded-md text-xs font-mono text-accent-purple flex items-center justify-between w-full shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                    <span>LLM UNDERSTANDING</span>
                    <Zap size={14} />
                  </div>
                  <div className="w-px h-4 bg-gradient-to-b from-accent-purple/40 to-transparent" />
                  
                  <div className="flex gap-4 w-full">
                    <div className="flex-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] bg-[#FAFAFA] rounded-md text-[10px] font-mono text-[#52525B] text-center">DOMAIN</div>
                    <div className="flex-1 px-4 py-2 border border-[rgba(0,0,0,0.1)] bg-[#FAFAFA] rounded-md text-[10px] font-mono text-[#52525B] text-center">RISK</div>
                  </div>
                  <div className="w-px h-4 bg-[rgba(0,0,0,0.1)]" />

                  <div className="px-4 py-2 border border-accent-blue/30 bg-accent-blue/5 rounded-md text-xs font-mono text-accent-blue flex items-center justify-between w-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <span>RAG SEARCH</span>
                    <Search size={14} />
                  </div>
                  <div className="w-px h-4 bg-gradient-to-b from-accent-blue/40 to-[rgba(0,0,0,0.2)]" />
                  
                  <div className="flex gap-4 w-full">
                    <div className="flex-1 px-4 py-2 border border-green-500/20 bg-green-500/5 rounded-md text-[10px] font-mono text-green-400 text-center flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> RESPONSE
                    </div>
                    <div className="flex-1 px-4 py-2 border border-orange-500/20 bg-orange-500/5 rounded-md text-[10px] font-mono text-orange-400 text-center flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" /> ESCALATE
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[40%] flex flex-col justify-center">
              <div className="mb-6">
                <p className="font-mono text-xs text-[#52525B] mb-4 uppercase tracking-widest text-[#050505]">Multi-Agent AI / RAG</p>
                <h3 className="text-3xl md:text-4xl font-medium text-[#050505] mb-6">AI Support Triage Agent</h3>
                <p className="text-lg text-[#52525B] leading-relaxed font-light mb-10">
                  Automated routing, sentiment analysis, and initial response generation using RAG and LLM coordination.
                </p>
              </div>
              <div>
                <a href="https://github.com/theakashr/AI-Support-Triage-Agent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-4 border border-[rgba(0,0,0,0.15)] rounded-md hover:bg-black hover:text-white text-[#050505] transition-all duration-300">
                  <span className="font-medium text-sm tracking-wide mr-2">VIEW SOURCE</span>
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>


          {/* PROJECT 4: Gully Cricket App */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group flex flex-col lg:flex-row-reverse gap-12 lg:gap-0"
          >
            <div className="w-full lg:w-[65%] lg:pl-16 relative">
              <div className="w-full aspect-[4/3] sm:aspect-video bg-[#FAFAFA] rounded-xl overflow-hidden relative border border-[rgba(0,0,0,0.05)] group-hover:border-[rgba(0,0,0,0.1)] transition-colors">
                
                {/* Dynamic sports background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-[#050505]" />
                
                {/* Layout */}
                <div className="absolute inset-0 p-8 flex flex-col md:flex-row gap-6">
                  {/* Mobile mockup */}
                  <div className="hidden md:flex w-[240px] h-full bg-[#F4F4F5] border border-[rgba(0,0,0,0.1)] rounded-[2rem] p-3 shadow-2xl relative shrink-0">
                    <div className="w-full h-full border border-[rgba(0,0,0,0.05)] rounded-[1.5rem] bg-[#FFFFFF] overflow-hidden flex flex-col">
                      <div className="h-40 bg-gradient-to-b from-green-900/40 to-transparent p-4 flex flex-col justify-end">
                        <span className="text-[10px] text-red-500 font-bold tracking-widest mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                        </span>
                        <div className="text-3xl font-bold text-[#050505] tracking-tighter">156<span className="text-xl text-[#52525B]">/4</span></div>
                        <div className="text-xs text-[#52525B]">12.4 OVERS</div>
                      </div>
                      <div className="flex-1 p-4 flex flex-col gap-3">
                        <div className="w-full h-12 bg-[#F4F4F5] rounded flex items-center px-3 justify-between">
                          <div className="w-16 h-2 bg-[rgba(0,0,0,0.1)] rounded" />
                          <div className="w-8 h-3 bg-black/80 rounded" />
                        </div>
                        <div className="w-full h-12 bg-[#F4F4F5] rounded flex items-center px-3 justify-between">
                          <div className="w-20 h-2 bg-[rgba(0,0,0,0.1)] rounded" />
                          <div className="w-6 h-3 bg-black/50 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop widgets */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="h-24 bg-[#F4F4F5] border border-[rgba(0,0,0,0.05)] rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-[#52525B] mb-1">RUN RATE</div>
                        <div className="text-2xl font-bold text-[#050505]">12.48</div>
                      </div>
                      <Activity className="text-green-500 opacity-50" />
                    </div>
                    <div className="flex-1 bg-[#F4F4F5] border border-[rgba(0,0,0,0.05)] rounded-lg p-4">
                      <div className="text-[10px] font-mono text-[#52525B] mb-4">MATCH STATUS</div>
                      <div className="w-full h-full relative flex items-end pb-4 gap-2">
                        {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-green-500/20 rounded-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="w-full lg:w-[35%] flex flex-col justify-center">
              <div className="mb-6">
                <p className="font-mono text-xs text-green-500 mb-4 uppercase tracking-widest">Real-time Sports Platform</p>
                <h3 className="text-3xl md:text-5xl font-medium text-[#050505] mb-6">Gully Cricket App</h3>
                <p className="text-lg text-[#52525B] leading-relaxed font-light mb-10">
                  Dynamic scoring, real-time statistics, and match tracking designed for local tournaments.
                </p>
              </div>
              <div>
                <a href="https://github.com/theakashr/gully-cricket-app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-4 border border-[rgba(0,0,0,0.08)] rounded-md hover:bg-[rgba(0,0,0,0.05)] text-[#050505] transition-all duration-300 group/btn">
                  <span className="font-medium text-sm tracking-wide mr-2">VIEW GITHUB</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform text-[#52525B]" />
                </a>
              </div>
            </div>
          </motion.div>


          {/* PROJECT 5 & 6 GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-12">
            
            {/* AI Health Predictor */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col group"
            >
              <div className="w-full aspect-[4/3] bg-[#FAFAFA] border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden relative mb-8 group-hover:border-[rgba(0,0,0,0.15)] transition-colors">
                <div className="absolute inset-0 p-6 flex flex-col gap-4">
                  <div className="flex gap-4 h-1/3">
                    <div className="flex-1 bg-[#F4F4F5] rounded-md p-4 flex flex-col justify-between">
                      <div className="w-8 h-2 bg-blue-500/50 rounded" />
                      <div className="w-16 h-6 bg-black/80 rounded" />
                    </div>
                    <div className="flex-1 bg-[#F4F4F5] rounded-md p-4 flex flex-col justify-between">
                      <div className="w-8 h-2 bg-teal-500/50 rounded" />
                      <div className="w-16 h-6 bg-black/80 rounded" />
                    </div>
                  </div>
                  <div className="flex-1 bg-[#F4F4F5] rounded-md p-4 relative overflow-hidden">
                     <svg className="absolute inset-x-0 bottom-0 w-full h-24 text-blue-500/20" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path d="M0 40 L 0 20 Q 20 5 40 20 T 80 15 T 100 5 L 100 40 Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-mono text-[10px] text-blue-400 uppercase tracking-widest mb-3">AI / Healthcare</p>
              <h3 className="text-2xl font-medium text-[#050505] mb-3">AI Health Predictor</h3>
              <p className="text-[#52525B] leading-relaxed font-light mb-6">
                Premium healthcare analytics interface with predictive modeling and trend generation.
              </p>
              <div className="flex gap-4 mt-auto">
                <a href="https://ai-health-predictor-theta.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#050505] hover:text-blue-400 transition-colors flex items-center">
                  LIVE SITE <ExternalLink size={14} className="ml-1" />
                </a>
                <a href="https://github.com/theakashr/ai-health-predictor" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#52525B] hover:text-[#050505] transition-colors flex items-center">
                  GITHUB
                </a>
              </div>
            </motion.div>

            {/* MediCart */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col group"
            >
              <div className="w-full aspect-[4/3] bg-[#FAFAFA] border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden relative mb-8 group-hover:border-[rgba(0,0,0,0.15)] transition-colors">
                 <div className="absolute inset-0 p-6 flex flex-col gap-3">
                   <div className="h-10 border-b border-[rgba(0,0,0,0.05)] flex items-center gap-4">
                     <div className="w-20 h-3 bg-black/20 rounded" />
                     <div className="w-12 h-3 bg-black/5 rounded" />
                     <div className="w-12 h-3 bg-black/5 rounded" />
                   </div>
                   <div className="flex flex-1 gap-4 pt-2">
                     <div className="w-1/4 flex flex-col gap-2">
                       {[1,2,3,4].map(i => <div key={i} className="h-8 bg-[#F4F4F5] rounded-sm" />)}
                     </div>
                     <div className="flex-1 bg-[#F4F4F5] rounded-sm border border-[rgba(0,0,0,0.02)]" />
                   </div>
                 </div>
              </div>
              <p className="font-mono text-[10px] text-[#52525B] uppercase tracking-widest mb-3">Pharmacy Management / SaaS</p>
              <h3 className="text-2xl font-medium text-[#050505] mb-3">MediCart</h3>
              <p className="text-[#52525B] leading-relaxed font-light mb-6">
                Clean enterprise UI for inventory, billing, sales tracking, and customer management.
              </p>
              <div className="flex gap-4 mt-auto">
                <span className="text-sm font-medium text-[#52525B] flex items-center">
                  INTERNAL SYSTEM
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
