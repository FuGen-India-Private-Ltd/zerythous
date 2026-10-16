"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitProjectBrief } from "@/app/actions/submit-brief";
import { CelebrationModal } from "@/components/CelebrationModal";

type ProjectData = {
  type: string;
  needs: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  projectName: string;
  phone: string;
  description: string;
};

const initialData: ProjectData = {
  type: "",
  needs: [],
  timeline: "",
  budget: "",
  name: "",
  email: "",
  company: "",
  projectName: "",
  phone: "",
  description: ""
};

const PROJECT_TYPES = ["AI Multi-Agent Swarm", "Intelligent SaaS Platform", "Real-Time Web Application", "Cross-Platform Mobile App", "Internal Ops & CMS", "Enterprise API Mesh", "Other"];
const PROJECT_NEEDS = ["Custom AI & RAG", "System Architecture", "Frontend (Next.js 16)", "Backend & APIs", "Database & Supabase RLS", "Cloud Infrastructure (AWS/Vercel)", "Automated Testing", "Security Audit"];
const TIMELINES = ["Urgent (2-4 Weeks)", "Standard (1-2 Months)", "Comprehensive (3+ Months)", "Flexible"];
const BUDGETS = ["< $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"];

export default function ProjectBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const updateData = <K extends keyof ProjectData>(field: K, value: ProjectData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleNeed = (need: string) => {
    setData(prev => ({
      ...prev,
      needs: prev.needs.includes(need) ? prev.needs.filter(n => n !== need) : [...prev.needs, need]
    }));
  };

  const handleNext = async () => {
    if (step === 5) {
      if (canProceed()) {
        setIsSubmitting(true);
        setSubmitError("");
        const res = await submitProjectBrief(data);
        setIsSubmitting(false);
        if (res.success) {
          setReferenceId(res.referenceId || "ZTX-ARCH-849201");
          setShowCelebration(true);
          setStep(6);
        } else {
          setSubmitError(res.error || "Something went wrong.");
        }
      }
    } else if (canProceed()) {
      setStep(s => Math.min(s + 1, 6));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const canProceed = () => {
    if (step === 1) return data.type !== "";
    if (step === 2) return data.needs.length > 0;
    if (step === 3) return data.timeline !== "";
    if (step === 4) return data.budget !== "";
    if (step === 5) return data.name !== "" && data.email !== "" && data.projectName !== "";
    return true;
  };

  return (
    <section id="project-builder" className="py-28 md:py-44 bg-background text-foreground border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full aurora-glow-purple blur-3xl pointer-events-none opacity-25" />
      <div className="absolute inset-0 grid-pattern-dual pointer-events-none opacity-30" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-mono text-xs mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            05 / ARCHITECTURE BRIEF BUILDER
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-[#09090B] dark:text-white leading-none font-heading">
            HAVE A SYSTEM <br/>
            <span className="text-accent-purple">
              TO ENGINEER?
            </span>
          </h2>
        </div>

        <div className="w-full max-w-5xl mx-auto glass-card bg-white/80 dark:bg-neutral-950/90 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
          
          {/* Header Progress */}
          <div className="bg-neutral-100/70 dark:bg-neutral-900/60 p-6 md:p-8 flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={cn(
                  "w-8 md:w-12 h-1.5 rounded-full transition-all duration-300",
                  i < step ? "bg-accent-purple/70" : i === step ? "bg-accent-purple shadow-md shadow-accent-purple/50" : "bg-neutral-200 dark:bg-neutral-800"
                )} />
              ))}
            </div>
            <div className="font-mono text-xs text-[#71717A] dark:text-neutral-400 uppercase tracking-wider font-semibold">
              PHASE {step} OF 6
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {step === 1 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#09090B] dark:text-white mb-8 font-heading uppercase">
                      What are you architecting?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {PROJECT_TYPES.map(type => (
                        <button
                          key={type}
                          onClick={() => { updateData('type', type); setTimeout(handleNext, 300); }}
                          className={cn(
                            "py-5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 uppercase border text-left",
                            data.type === type 
                              ? "bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] border-accent-purple shadow-md font-bold" 
                              : "bg-white/70 dark:bg-neutral-900/70 text-[#52525B] dark:text-neutral-300 border-black/[0.08] dark:border-white/[0.08] hover:border-accent-purple/40 hover:bg-white dark:hover:bg-neutral-800"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#09090B] dark:text-white mb-8 font-heading uppercase">
                      Required Architectural Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-8">
                      {PROJECT_NEEDS.map(need => (
                        <button
                          key={need}
                          onClick={() => toggleNeed(need)}
                          className={cn(
                            "py-5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 uppercase border text-left",
                            data.needs.includes(need) 
                              ? "bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] border-accent-purple shadow-md font-bold" 
                              : "bg-white/70 dark:bg-neutral-900/70 text-[#52525B] dark:text-neutral-300 border-black/[0.08] dark:border-white/[0.08] hover:border-accent-purple/40 hover:bg-white dark:hover:bg-neutral-800"
                          )}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#09090B] dark:text-white mb-8 font-heading uppercase">
                      Target Production Timeline
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {TIMELINES.map(time => (
                        <button
                          key={time}
                          onClick={() => { updateData('timeline', time); setTimeout(handleNext, 300); }}
                          className={cn(
                            "py-6 px-5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 uppercase border text-left",
                            data.timeline === time 
                              ? "bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] border-accent-purple shadow-md font-bold" 
                              : "bg-white/70 dark:bg-neutral-900/70 text-[#52525B] dark:text-neutral-300 border-black/[0.08] dark:border-white/[0.08] hover:border-accent-purple/40 hover:bg-white dark:hover:bg-neutral-800"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#09090B] dark:text-white mb-8 font-heading uppercase">
                      Allocated Capital / Budget Range
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {BUDGETS.map(b => (
                        <button
                          key={b}
                          onClick={() => { updateData('budget', b); setTimeout(handleNext, 300); }}
                          className={cn(
                            "py-6 px-5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 uppercase border text-left",
                            data.budget === b 
                              ? "bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] border-accent-purple shadow-md font-bold" 
                              : "bg-white/70 dark:bg-neutral-900/70 text-[#52525B] dark:text-neutral-300 border-black/[0.08] dark:border-white/[0.08] hover:border-accent-purple/40 hover:bg-white dark:hover:bg-neutral-800"
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#09090B] dark:text-white mb-8 font-heading uppercase">
                      Primary Contact & Scope Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input 
                        type="text" 
                        placeholder="Your Name *" 
                        value={data.name} 
                        onChange={e => updateData('name', e.target.value)} 
                        className="w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-[#09090B] dark:text-white placeholder-[#71717A] dark:placeholder-neutral-500 focus:outline-none focus:border-accent-purple transition-colors text-sm" 
                      />
                      <input 
                        type="email" 
                        placeholder="Work Email *" 
                        value={data.email} 
                        onChange={e => updateData('email', e.target.value)} 
                        className="w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-[#09090B] dark:text-white placeholder-[#71717A] dark:placeholder-neutral-500 focus:outline-none focus:border-accent-purple transition-colors text-sm" 
                      />
                      <input 
                        type="text" 
                        placeholder="Company / Venture (Optional)" 
                        value={data.company} 
                        onChange={e => updateData('company', e.target.value)} 
                        className="w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-[#09090B] dark:text-white placeholder-[#71717A] dark:placeholder-neutral-500 focus:outline-none focus:border-accent-purple transition-colors text-sm" 
                      />
                      <input 
                        type="text" 
                        placeholder="Project Name / Initiative *" 
                        value={data.projectName} 
                        onChange={e => updateData('projectName', e.target.value)} 
                        className="w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-[#09090B] dark:text-white placeholder-[#71717A] dark:placeholder-neutral-500 focus:outline-none focus:border-accent-purple transition-colors text-sm" 
                      />
                      <input 
                        type="tel" 
                        placeholder="Direct Phone / WhatsApp (Optional)" 
                        value={data.phone} 
                        onChange={e => updateData('phone', e.target.value)} 
                        className="w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-[#09090B] dark:text-white placeholder-[#71717A] dark:placeholder-neutral-500 focus:outline-none focus:border-accent-purple transition-colors text-sm md:col-span-2" 
                      />
                      <textarea 
                        placeholder="Brief Architecture Description & Current Bottlenecks (Optional)" 
                        value={data.description} 
                        onChange={e => updateData('description', e.target.value)} 
                        className="w-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-[#09090B] dark:text-white placeholder-[#71717A] dark:placeholder-neutral-500 focus:outline-none focus:border-accent-purple transition-colors md:col-span-2 h-32 resize-none text-sm" 
                      />
                    </div>
                    {submitError && <div className="text-red-500 mt-4 text-sm font-mono">{submitError}</div>}
                  </div>
                )}

                {step === 6 && (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-accent-purple/15 border border-accent-purple/40 rounded-full flex items-center justify-center mb-6 text-accent-purple shadow-xl shadow-accent-purple/20">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#09090B] dark:text-white mb-2 font-heading uppercase">
                      Architecture Brief Queued.
                    </h3>
                    <p className="text-[#52525B] dark:text-neutral-400 text-sm mb-8 max-w-md font-light">
                      Your technical specification has been securely routed and saved. A principal engineer is reviewing your architecture topology.
                    </p>
                    
                    <div className="w-full max-w-2xl bg-neutral-100/80 dark:bg-neutral-900/90 border border-black/10 dark:border-white/10 rounded-xl p-6 text-left mb-8 grid grid-cols-2 gap-y-4 gap-x-6 text-xs shadow-sm">
                      <div>
                        <span className="font-mono text-[#71717A] dark:text-neutral-400 block mb-1">PROJECT TYPE</span>
                        <span className="text-[#09090B] dark:text-white font-medium">{data.type}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[#71717A] dark:text-neutral-400 block mb-1">TIMELINE</span>
                        <span className="text-[#09090B] dark:text-white font-medium">{data.timeline}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-mono text-[#71717A] dark:text-neutral-400 block mb-1">REQUIRED CAPABILITIES</span>
                        <span className="text-accent-purple font-mono font-semibold">{data.needs.join(", ")}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[#71717A] dark:text-neutral-400 block mb-1">ALLOCATED CAPITAL</span>
                        <span className="text-[#09090B] dark:text-white font-medium">{data.budget}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[#71717A] dark:text-neutral-400 block mb-1">CLIENT CONTACT</span>
                        <span className="text-[#09090B] dark:text-white font-medium">{data.name}</span>
                      </div>
                    </div>

                    <div className="flex gap-6 font-mono text-xs text-[#71717A] dark:text-neutral-400 uppercase tracking-widest font-semibold">
                      <a href="mailto:zerythous345@gmail.com" className="hover:text-accent-purple transition-colors">zerythous345@gmail.com</a>
                      <span>•</span>
                      <a href="tel:+918660904369" className="hover:text-accent-purple transition-colors">+91 8660904369</a>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          {step < 6 && (
            <div className="bg-neutral-100/70 dark:bg-neutral-900/60 p-6 md:p-8 flex items-center justify-between border-t border-black/[0.08] dark:border-white/[0.08]">
              {step > 1 ? (
                <button onClick={prevStep} className="flex items-center text-[#52525B] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white transition-colors text-xs font-mono font-semibold">
                  <ArrowLeft size={14} className="mr-2" /> PREVIOUS
                </button>
              ) : <div />}
              
              <button 
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className={cn(
                  "flex items-center px-6 py-3.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300",
                  (canProceed() && !isSubmitting) 
                    ? "bg-[#09090B] text-white hover:bg-accent-purple dark:bg-white dark:text-[#09090B] dark:hover:bg-accent-purple dark:hover:text-white shadow-md" 
                    : "bg-neutral-200 dark:bg-neutral-800 text-[#71717A] dark:text-neutral-500 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <><Loader2 size={14} className="animate-spin mr-2" /> DISPATCHING...</>
                ) : (step === 5 ? "DISPATCH SPECIFICATION" : "CONTINUE")} 
                {!isSubmitting && <ChevronRight size={14} className="ml-1" />}
              </button>
            </div>
          )}
        </div>
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        referenceId={referenceId}
        clientName={data.name || "Innovator"}
        projectName={data.projectName}
        type="project_brief"
      />
    </section>
  );
}
