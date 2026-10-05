"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitProjectBrief } from "@/app/actions/submit-brief";

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

const PROJECT_TYPES = ["Web App", "AI Product", "SaaS", "Mobile App", "Internal Tool", "API", "Other"];
const PROJECT_NEEDS = ["Frontend", "Backend", "AI", "Database", "Authentication", "Cloud", "UI/UX"];
const TIMELINES = ["ASAP", "1-3 MONTHS", "3-6 MONTHS", "FLEXIBLE"];
const BUDGETS = ["< ₹5L", "₹5L-₹10L", "₹10L-₹25L", "₹25L+"];

export default function ProjectBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateData = (field: keyof ProjectData, value: any) => {
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
    <section id="project-builder" className="py-32 md:py-48 bg-[#FAFAF9]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest text-[#71717A] uppercase mb-6">
            08 / Start a Project
          </p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#09090B] font-heading">
            HAVE A <br/>
            SYSTEM TO BUILD?
          </h2>
        </div>

        <div className="w-full max-w-5xl mx-auto bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[600px]">
          
          {/* Header Progress */}
          <div className="bg-[#FAFAF9] p-6 md:p-8 flex items-center justify-between border-b border-[rgba(0,0,0,0.05)]">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={cn(
                  "w-8 md:w-12 h-1 rounded-full transition-colors duration-300",
                  i < step ? "bg-[#09090B]" : i === step ? "bg-accent-purple" : "bg-[rgba(0,0,0,0.1)]"
                )} />
              ))}
            </div>
            <div className="font-mono text-xs text-[#71717A]">
              STEP {step} OF 6
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
                    <h3 className="text-2xl md:text-4xl font-medium text-[#09090B] mb-10 font-heading uppercase">What are you building?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {PROJECT_TYPES.map(type => (
                        <button
                          key={type}
                          onClick={() => { updateData('type', type); setTimeout(handleNext, 300); }}
                          className={cn(
                            "py-6 px-4 border rounded-xl text-sm font-medium tracking-wide transition-all duration-300 uppercase",
                            data.type === type ? "bg-[#09090B] text-white border-[#09090B]" : "bg-white text-[#09090B] border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.3)] hover:bg-[#FAFAF9]"
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
                    <h3 className="text-2xl md:text-4xl font-medium text-[#09090B] mb-10 font-heading uppercase">What do you need?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {PROJECT_NEEDS.map(need => (
                        <button
                          key={need}
                          onClick={() => toggleNeed(need)}
                          className={cn(
                            "py-6 px-4 border rounded-xl text-sm font-medium tracking-wide transition-all duration-300 uppercase",
                            data.needs.includes(need) ? "bg-[#09090B] text-white border-[#09090B]" : "bg-white text-[#09090B] border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.3)] hover:bg-[#FAFAF9]"
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
                    <h3 className="text-2xl md:text-4xl font-medium text-[#09090B] mb-10 font-heading uppercase">Timeline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {TIMELINES.map(time => (
                        <button
                          key={time}
                          onClick={() => { updateData('timeline', time); setTimeout(handleNext, 300); }}
                          className={cn(
                            "py-6 px-4 border rounded-xl text-sm font-medium tracking-wide transition-all duration-300 uppercase",
                            data.timeline === time ? "bg-[#09090B] text-white border-[#09090B]" : "bg-white text-[#09090B] border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.3)] hover:bg-[#FAFAF9]"
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
                    <h3 className="text-2xl md:text-4xl font-medium text-[#09090B] mb-10 font-heading uppercase">Budget</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {BUDGETS.map(b => (
                        <button
                          key={b}
                          onClick={() => { updateData('budget', b); setTimeout(handleNext, 300); }}
                          className={cn(
                            "py-6 px-4 border rounded-xl text-sm font-medium tracking-wide transition-all duration-300 uppercase",
                            data.budget === b ? "bg-[#09090B] text-white border-[#09090B]" : "bg-white text-[#09090B] border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.3)] hover:bg-[#FAFAF9]"
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
                    <h3 className="text-2xl md:text-4xl font-medium text-[#09090B] mb-10 font-heading uppercase">Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" placeholder="Name *" value={data.name} onChange={e => updateData('name', e.target.value)} className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-4 text-[#09090B] focus:outline-none focus:border-accent-purple transition-colors" />
                      <input type="email" placeholder="Email *" value={data.email} onChange={e => updateData('email', e.target.value)} className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-4 text-[#09090B] focus:outline-none focus:border-accent-purple transition-colors" />
                      <input type="text" placeholder="Company (Optional)" value={data.company} onChange={e => updateData('company', e.target.value)} className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-4 text-[#09090B] focus:outline-none focus:border-accent-purple transition-colors" />
                      <input type="text" placeholder="Project Name *" value={data.projectName} onChange={e => updateData('projectName', e.target.value)} className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-4 text-[#09090B] focus:outline-none focus:border-accent-purple transition-colors" />
                      <input type="tel" placeholder="Phone (Optional)" value={data.phone} onChange={e => updateData('phone', e.target.value)} className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-4 text-[#09090B] focus:outline-none focus:border-accent-purple transition-colors md:col-span-2" />
                      <textarea placeholder="Brief Description (Optional)" value={data.description} onChange={e => updateData('description', e.target.value)} className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-4 text-[#09090B] focus:outline-none focus:border-accent-purple transition-colors md:col-span-2 h-32 resize-none" />
                    </div>
                    {submitError && <div className="text-red-500 mt-4 text-sm">{submitError}</div>}
                  </div>
                )}

                {step === 6 && (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#FAFAF9] rounded-full flex items-center justify-center mb-8 border border-[rgba(0,0,0,0.1)]">
                      <div className="w-8 h-8 bg-accent-purple rounded-full animate-pulse" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-medium text-[#09090B] mb-4 font-heading uppercase">Project Brief Ready.</h3>
                    
                    <div className="w-full max-w-2xl bg-[#FAFAF9] border border-[rgba(0,0,0,0.05)] rounded-xl p-6 text-left mb-8 grid grid-cols-2 gap-y-6">
                      <div>
                        <span className="font-mono text-[10px] text-[#71717A] block mb-1">PROJECT TYPE</span>
                        <span className="text-[#09090B] text-sm font-medium">{data.type}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#71717A] block mb-1">TIMELINE</span>
                        <span className="text-[#09090B] text-sm font-medium">{data.timeline}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-mono text-[10px] text-[#71717A] block mb-1">SERVICES</span>
                        <span className="text-[#09090B] text-sm font-medium">{data.needs.join(", ")}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#71717A] block mb-1">BUDGET</span>
                        <span className="text-[#09090B] text-sm font-medium">{data.budget}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#71717A] block mb-1">CONTACT</span>
                        <span className="text-[#09090B] text-sm font-medium">{data.name}</span>
                      </div>
                    </div>

                    <p className="text-[#52525B] text-sm mb-6 max-w-lg">
                      We'll review your requirements and get back to you shortly.
                    </p>

                    <div className="flex gap-6 font-mono text-[10px] text-[#71717A] uppercase tracking-widest">
                      <a href="mailto:zerythous345@gmail.com" className="hover:text-accent-purple transition-colors">EMAIL US</a>
                      <a href="tel:+918660904369" className="hover:text-accent-purple transition-colors">CALL US</a>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          {step < 6 && (
            <div className="bg-[#FAFAF9] p-6 md:p-8 flex items-center justify-between border-t border-[rgba(0,0,0,0.05)]">
              {step > 1 ? (
                <button onClick={prevStep} className="flex items-center text-[#71717A] hover:text-[#09090B] transition-colors text-sm font-medium">
                  <ArrowLeft size={16} className="mr-2" /> BACK
                </button>
              ) : <div />}
              
              <button 
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className={cn(
                  "flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  (canProceed() && !isSubmitting) ? "bg-[#09090B] text-white hover:bg-accent-purple" : "bg-[rgba(0,0,0,0.05)] text-[#A1A1AA] cursor-not-allowed"
                )}
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (step === 5 ? "GENERATE BRIEF" : "NEXT STEP")} 
                {!isSubmitting && <ChevronRight size={16} className="ml-2" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
