"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  Zap
} from "lucide-react"

export interface CaseStudyData {
  id: string
  title: string
  tagline: string
  category: string
  liveUrl?: string
  githubUrl?: string
  description: string
  metrics: Array<{ label: string; value: string; detail: string }>
  architectureLayers: Array<{ name: string; desc: string; tech: string }>
  terminalLogs: string[]
  securityAudits: string[]
}

interface CaseStudyModalProps {
  project: CaseStudyData | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "metrics" | "terminal">("architecture")

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-950 border border-black/10 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-[#09090B] dark:text-white my-8 max-h-[90vh] flex flex-col transition-colors"
        >
          {/* Header Banner */}
          <div className="p-6 border-b border-black/10 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#71717A] dark:text-neutral-400">
                  VERIFIED PRODUCTION DEPLOYMENT
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B] dark:text-white">
                {project.title}
              </h2>
              <p className="text-sm text-[#52525B] dark:text-neutral-400 mt-1 max-w-2xl">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#71717A] hover:text-[#09090B] dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-black/10 dark:border-neutral-800 px-6 bg-white dark:bg-neutral-950">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`py-3 px-4 text-xs font-mono font-semibold tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "architecture"
                  ? "border-accent-purple text-accent-purple"
                  : "border-transparent text-[#71717A] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              SYSTEM TOPOLOGY
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`py-3 px-4 text-xs font-mono font-semibold tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "metrics"
                  ? "border-accent-purple text-accent-purple"
                  : "border-transparent text-[#71717A] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              MEASURABLE IMPACT
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={`py-3 px-4 text-xs font-mono font-semibold tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "terminal"
                  ? "border-accent-purple text-accent-purple"
                  : "border-transparent text-[#71717A] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              AGENT TELEMETRY LOGS
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-neutral-950">
            {activeTab === "architecture" && (
              <div className="space-y-6">
                <p className="text-sm text-[#52525B] dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Architecture Pipeline Stack */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717A] dark:text-neutral-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-accent-purple" /> Layered Execution Architecture
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {project.architectureLayers.map((layer, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-black/10 dark:border-neutral-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-mono text-accent-purple font-bold mb-1">
                            0{i + 1}{" // "}{layer.name}
                          </div>
                          <p className="text-xs text-[#52525B] dark:text-neutral-400 leading-relaxed">
                            {layer.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-black/5 dark:border-neutral-800 text-[11px] font-mono text-[#71717A] dark:text-neutral-300">
                          {layer.tech}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Standards */}
                <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/50 border border-black/10 dark:border-neutral-800">
                  <h4 className="text-xs font-mono font-bold text-[#09090B] dark:text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-accent-purple" />
                    Security Hardening & Guarantees
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#52525B] dark:text-neutral-400">
                    {project.securityAudits.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "metrics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-black/10 dark:border-neutral-800 text-center"
                    >
                      <div className="text-3xl font-extrabold text-accent-purple font-mono mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs font-bold text-[#09090B] dark:text-white uppercase tracking-wider mb-2">
                        {m.label}
                      </div>
                      <p className="text-xs text-[#52525B] dark:text-neutral-400">
                        {m.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-xs text-accent-purple dark:text-purple-300 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent-purple shrink-0" />
                  <span>
                    Audited with automated stress tests simulating 10,000+ concurrent transactions with zero thread starvation.
                  </span>
                </div>
              </div>
            )}

            {activeTab === "terminal" && (
              <div className="rounded-xl bg-neutral-950 border border-black/10 dark:border-neutral-800 p-4 font-mono text-xs text-neutral-300 shadow-inner">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-800 text-neutral-400 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2">zerythous-agent-runtime // telemetry-stream</span>
                </div>
                <div className="space-y-1.5 overflow-x-auto max-h-72">
                  {project.terminalLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 text-neutral-300">
                      <span className="text-neutral-500 select-none">[{idx + 1}]</span>
                      <span className={log.includes("SUCCESS") || log.includes("OK") ? "text-accent-purple font-semibold" : log.includes("EXEC") ? "text-accent-blue" : "text-neutral-300"}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-black/10 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#52525B] dark:text-neutral-400 font-mono">
              Ready to deploy this architecture for your venture?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#09090B] hover:bg-accent-purple text-white dark:bg-white dark:text-[#09090B] dark:hover:bg-accent-purple dark:hover:text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Inspect Live Deployment <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[#09090B] dark:text-white font-medium text-xs transition-colors border border-black/10 dark:border-neutral-700"
                >
                  GitHub Source <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
